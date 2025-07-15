const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} = require('@solana/web3.js');
const {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID
} = require('@solana/spl-token');
const {
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID: METADATA_PROGRAM_ID
} = require('@metaplex-foundation/mpl-token-metadata');
const bs58 = require('bs58');

const app = express();
const PORT = process.env.PORT || 3000;

// RPC endpoints configuration - using public endpoints for security
const RPC_ENDPOINTS = {
    devnet: process.env.SOLANA_DEVNET_RPC || 'https://api.devnet.solana.com',
    testnet: process.env.SOLANA_TESTNET_RPC || 'https://api.testnet.solana.com',
    mainnet: process.env.SOLANA_MAINNET_RPC || 'https://api.mainnet-beta.solana.com'
};

// Note: For production use, set environment variables:
// SOLANA_DEVNET_RPC, SOLANA_TESTNET_RPC, SOLANA_MAINNET_RPC

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'token-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('只允许上传图片文件'));
        }
    }
});

// Utility functions
function validatePrivateKey(privateKeyString) {
    try {
        const privateKeyBytes = bs58.decode(privateKeyString);
        if (privateKeyBytes.length !== 64) {
            throw new Error('私钥长度不正确');
        }
        return Keypair.fromSecretKey(privateKeyBytes);
    } catch (error) {
        throw new Error('私钥格式无效: ' + error.message);
    }
}

async function checkSolBalance(connection, publicKey, minBalance = 0.01) {
    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;
    
    if (solBalance < minBalance) {
        throw new Error(`钱包余额不足。当前余额: ${solBalance.toFixed(4)} SOL，至少需要: ${minBalance} SOL`);
    }
    
    return solBalance;
}

function generateMetadata(tokenData, imageUri) {
    return {
        name: tokenData.tokenName,
        symbol: tokenData.tokenSymbol,
        description: tokenData.tokenDescription || `${tokenData.tokenName} (${tokenData.tokenSymbol}) - 基于Solana区块链的SPL代币`,
        image: imageUri,
        attributes: [
            {
                trait_type: "Type",
                value: "SPL Token"
            },
            {
                trait_type: "Network",
                value: tokenData.network
            },
            {
                trait_type: "Supply",
                value: tokenData.tokenSupply.toString()
            },
            {
                trait_type: "Decimals",
                value: tokenData.tokenDecimals.toString()
            }
        ],
        properties: {
            category: "token",
            creators: []
        }
    };
}

async function findMetadataAddress(mintPublicKey) {
    const [metadataAddress] = await PublicKey.findProgramAddress(
        [
            Buffer.from('metadata'),
            METADATA_PROGRAM_ID.toBuffer(),
            mintPublicKey.toBuffer(),
        ],
        METADATA_PROGRAM_ID
    );
    return metadataAddress;
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        networks: Object.keys(RPC_ENDPOINTS)
    });
});

// Balance check endpoint
app.post('/api/check-balance', async (req, res) => {
    try {
        const { privateKey, network } = req.body;
        
        // Validate inputs
        if (!privateKey || !network) {
            return res.status(400).json({ error: '请提供私钥和网络参数' });
        }
        
        if (!RPC_ENDPOINTS[network]) {
            return res.status(400).json({ error: '不支持的网络环境' });
        }
        
        // Validate private key
        let payer;
        try {
            payer = validatePrivateKey(privateKey);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
        
        // Connect to network
        const connection = new Connection(RPC_ENDPOINTS[network], 'confirmed');
        
        // Check balance
        const balance = await connection.getBalance(payer.publicKey);
        const solBalance = balance / LAMPORTS_PER_SOL;
        
        res.json({
            success: true,
            walletAddress: payer.publicKey.toString(),
            network: network,
            balance: solBalance.toFixed(4),
            balanceRaw: balance,
            isEnough: solBalance >= 0.01,
            minRequired: 0.01
        });
        
    } catch (error) {
        console.error('余额检查失败:', error);
        res.status(500).json({ 
            error: '余额检查失败: ' + error.message 
        });
    }
});

// Create token endpoint
app.post('/api/create-token', upload.single('tokenImage'), async (req, res) => {
    try {
        console.log('开始创建代币...');
        console.log('请求体字段:', Object.keys(req.body));
        console.log('文件信息:', req.file ? req.file.filename : '无文件');
        
        // Validate request
        if (!req.file) {
            console.log('错误: 未上传图片文件');
            return res.status(400).json({ error: '请上传代币图片' });
        }

        const {
            privateKey,
            tokenName,
            tokenSymbol,
            tokenDescription,
            tokenSupply,
            tokenDecimals,
            network
        } = req.body;

        console.log('接收到的网络:', network);
        console.log('可用网络:', Object.keys(RPC_ENDPOINTS));

        // Validate required fields
        if (!privateKey || !tokenName || !tokenSymbol || !tokenSupply) {
            console.log('错误: 缺少必填字段');
            console.log('privateKey:', !!privateKey);
            console.log('tokenName:', !!tokenName);
            console.log('tokenSymbol:', !!tokenSymbol);
            console.log('tokenSupply:', !!tokenSupply);
            return res.status(400).json({ error: '请填写所有必填字段' });
        }

        // Validate network
        if (!RPC_ENDPOINTS[network]) {
            console.log('错误: 不支持的网络环境:', network);
            return res.status(400).json({ error: '不支持的网络环境' });
        }

        console.log(`使用网络: ${network}`);
        console.log(`RPC端点: ${RPC_ENDPOINTS[network]}`);
        console.log(`代币信息: ${tokenName} (${tokenSymbol})`);

        // Parse and validate inputs
        const supply = parseInt(tokenSupply);
        const decimals = parseInt(tokenDecimals) || 9;

        if (isNaN(supply) || supply <= 0) {
            console.log('错误: 代币数量无效:', tokenSupply);
            return res.status(400).json({ error: '代币数量必须是正整数' });
        }

        if (decimals < 0 || decimals > 9) {
            console.log('错误: 小数位数无效:', decimals);
            return res.status(400).json({ error: '小数位数必须在0-9之间' });
        }

        // Validate private key and create keypair
        let payer;
        try {
            payer = validatePrivateKey(privateKey);
        } catch (error) {
            console.log('错误: 私钥验证失败:', error.message);
            return res.status(400).json({ error: error.message });
        }

        console.log(`钱包地址: ${payer.publicKey.toString()}`);

        // Connect to Solana
        const connection = new Connection(RPC_ENDPOINTS[network], 'confirmed');
        
        // Check connection
        try {
            console.log('正在连接到Solana网络...');
            const version = await connection.getVersion();
            console.log('成功连接到Solana网络, 版本:', version);
        } catch (error) {
            console.error('连接Solana失败:', error);
            return res.status(500).json({ error: '无法连接到Solana网络，请稍后重试' });
        }

        // Check SOL balance
        try {
            console.log('检查钱包余额...');
            const balance = await checkSolBalance(connection, payer.publicKey, 0.01);
            console.log(`钱包余额: ${balance.toFixed(4)} SOL`);
        } catch (error) {
            console.log('余额检查失败:', error.message);
            return res.status(400).json({ error: error.message });
        }

        // Create placeholder URIs (in production, upload to IPFS or other storage)
        const imageUri = `https://placeholder.example.com/token-images/${req.file.filename}`;
        const metadataUri = `https://placeholder.example.com/token-metadata/${req.file.filename}.json`;

        console.log('开始创建代币铸造账户...');

        // Create token mint
        const mint = await createMint(
            connection,
            payer,
            payer.publicKey,
            payer.publicKey,
            decimals,
            undefined,
            undefined,
            TOKEN_PROGRAM_ID
        );

        console.log(`代币铸造地址: ${mint.toString()}`);

        // Create associated token account
        console.log('创建代币账户...');
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payer,
            mint,
            payer.publicKey
        );

        console.log(`代币账户地址: ${tokenAccount.address.toString()}`);

        // Mint tokens
        console.log(`铸造 ${supply} 个代币...`);
        const mintSignature = await mintTo(
            connection,
            payer,
            mint,
            tokenAccount.address,
            payer.publicKey,
            supply * Math.pow(10, decimals)
        );

        console.log(`铸造交易签名: ${mintSignature}`);

        // Create metadata
        console.log('创建代币元数据...');
        
        const metadata = generateMetadata({
            tokenName,
            tokenSymbol,
            tokenDescription,
            tokenSupply: supply,
            tokenDecimals: decimals,
            network
        }, imageUri);

        // Save metadata to file
        const metadataPath = path.join(__dirname, 'uploads', `metadata-${req.file.filename}.json`);
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

        // Find metadata account address
        const metadataAddress = await findMetadataAddress(mint);

        // Create metadata account instruction
        const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataAddress,
                mint: mint,
                mintAuthority: payer.publicKey,
                payer: payer.publicKey,
                updateAuthority: payer.publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: {
                        name: tokenName,
                        symbol: tokenSymbol,
                        uri: metadataUri,
                        sellerFeeBasisPoints: 0,
                        creators: null,
                        collection: null,
                        uses: null,
                    },
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        );

        // Create and send metadata transaction
        const metadataTransaction = new Transaction().add(createMetadataInstruction);
        
        try {
            const metadataSignature = await connection.sendTransaction(metadataTransaction, [payer]);
            await connection.confirmTransaction(metadataSignature);
            console.log(`元数据交易签名: ${metadataSignature}`);
        } catch (error) {
            console.warn('元数据创建失败，但代币创建成功:', error.message);
        }

        // Save token information
        const tokenInfo = {
            name: tokenName,
            symbol: tokenSymbol,
            description: tokenDescription,
            decimals: decimals,
            supply: supply,
            mintAddress: mint.toString(),
            tokenAccount: tokenAccount.address.toString(),
            walletAddress: payer.publicKey.toString(),
            mintSignature: mintSignature,
            imagePath: req.file.path,
            imageUri: imageUri,
            metadataUri: metadataUri,
            metadataAccount: metadataAddress.toString(),
            network: network,
            rpcEndpoint: RPC_ENDPOINTS[network],
            createdAt: new Date().toISOString()
        };

        const tokenInfoPath = path.join(__dirname, 'uploads', `token-info-${req.file.filename}.json`);
        fs.writeFileSync(tokenInfoPath, JSON.stringify(tokenInfo, null, 2));

        console.log('代币创建成功！');

        // Return success response
        res.json({
            success: true,
            message: '代币创建成功！',
            data: {
                mintAddress: mint.toString(),
                tokenAccount: tokenAccount.address.toString(),
                signature: mintSignature,
                walletAddress: payer.publicKey.toString(),
                network: network,
                explorerUrl: `https://explorer.solana.com/tx/${mintSignature}${network !== 'mainnet' ? `?cluster=${network}` : ''}`
            }
        });

    } catch (error) {
        console.error('代币创建过程中发生错误:', error);
        
        // Clean up uploaded file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // 根据错误类型返回不同的状态码和消息
        if (error.message.includes('余额不足')) {
            return res.status(400).json({ error: error.message });
        } else if (error.message.includes('私钥')) {
            return res.status(400).json({ error: error.message });
        } else if (error.message.includes('网络')) {
            return res.status(500).json({ error: error.message });
        } else if (error.message.includes('连接')) {
            return res.status(500).json({ error: '网络连接失败，请检查网络设置' });
        } else {
            return res.status(500).json({ 
                error: '代币创建失败，请重试',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
});

// Get token info endpoint
app.get('/api/token/:mintAddress', async (req, res) => {
    try {
        const { mintAddress } = req.params;
        const { network = 'devnet' } = req.query;

        if (!RPC_ENDPOINTS[network]) {
            return res.status(400).json({ error: '不支持的网络环境' });
        }

        const connection = new Connection(RPC_ENDPOINTS[network], 'confirmed');
        
        // Get mint info
        const mintPublicKey = new PublicKey(mintAddress);
        const mintInfo = await connection.getParsedAccountInfo(mintPublicKey);

        if (!mintInfo.value) {
            return res.status(404).json({ error: '代币不存在' });
        }

        res.json({
            success: true,
            mintAddress: mintAddress,
            mintInfo: mintInfo.value.data,
            network: network
        });

    } catch (error) {
        console.error('获取代币信息失败:', error);
        res.status(500).json({
            error: '获取代币信息失败: ' + error.message
        });
    }
});

// Utility function to get explorer URL
function getExplorerUrl(network, signature) {
    const baseUrls = {
        devnet: 'https://explorer.solana.com/?cluster=devnet',
        testnet: 'https://explorer.solana.com/?cluster=testnet',
        mainnet: 'https://explorer.solana.com'
    };
    
    return `${baseUrls[network]}/tx/${signature}`;
}

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: '文件大小超过限制（最大5MB）' });
        }
    }
    
    console.error('服务器错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: '接口不存在' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SPL Token Minting 服务器启动成功！`);
    console.log(`📱 访问地址: http://localhost:${PORT}`);
    console.log(`🌐 支持的网络环境:`);
    Object.keys(RPC_ENDPOINTS).forEach(network => {
        console.log(`   - ${network}: ${RPC_ENDPOINTS[network]}`);
    });
    console.log(`📁 上传目录: ${path.join(__dirname, 'uploads')}`);
    console.log('');
    console.log('准备就绪，等待代币创建请求...');
});

module.exports = app;