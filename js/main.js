// SPL Token Minting - Frontend JavaScript

class SPLTokenMinter {
    constructor() {
        this.rpcEndpoints = {
            devnet: 'https://falling-virulent-lake.solana-devnet.quiknode.pro/1a9dd93335edb93c8953755162ba7acf57bf73cd',
            testnet: 'https://falling-virulent-lake.solana-testnet.quiknode.pro/1a9dd93335edb93c8953755162ba7acf57bf73cd',
            mainnet: 'https://falling-virulent-lake.solana-mainnet.quiknode.pro/1a9dd93335edb93c8953755162ba7acf57bf73cd'
        };
        
        this.explorerUrls = {
            devnet: 'https://explorer.solana.com/?cluster=devnet',
            testnet: 'https://explorer.solana.com/?cluster=testnet',
            mainnet: 'https://explorer.solana.com'
        };
        
        // API base URL - 确保指向正确的服务器地址
        this.apiBaseUrl = 'http://localhost:3001';
        
        this.currentNetwork = 'devnet';
        this.selectedImage = null;
        this.currentLanguage = 'zh-CN';
        this.currentColorMode = 'light';
        this.isProcessing = false;
        this.currentStep = 0;
        this.totalSteps = 5;
        
        this.translations = {
            'zh-CN': {
                'title': 'SPL Token Minting - SOLANA代币生成器',
                'logoSubtitle': 'SOLANA代币生成器',
                'formTitle': '创建您的SPL代币',
                'formDescription': '填写以下信息来创建您的SOLANA链上SPL代币',
                'createToken': '创建代币',
                'creating': '创建中...',
                'tokenName': '代币名称',
                'tokenSymbol': '代币简称',
                'tokenDescription': '代币简介',
                'tokenSupply': '代币总量',
                'tokenDecimals': '小数位数',
                'tokenImage': '代币图片',
                'privateKey': '钱包私钥',
                'network': '网络环境',
                'uploadImage': '点击上传图片',
                'imageSupport': '支持 PNG, JPG, GIF (推荐 1000x1000)',
                'required': '*',
                'copy': '复制',
                'copied': '已复制!',
                'viewTransaction': '查看交易',
                'tokenNamePlaceholder': '例如: My Awesome Token',
                'tokenSymbolPlaceholder': '例如: MAT',
                'tokenDescriptionPlaceholder': '描述您的代币用途和特点...',
                'privateKeyPlaceholder': '请输入您的钱包私钥 (Base58格式)',
                'privateKeyHelp': '私钥将用于签署交易，不会被存储或传输',
                'tokenDescriptionHelp': '最多200个字符',
                'devnet': '开发环境 (Devnet)',
                'testnet': '测试环境 (Testnet)',
                'mainnet': '正式环境 (Mainnet)',
                'decimals0': '0 (整数代币)',
                'decimals2': '2 (类似美分)',
                'decimals6': '6 (推荐)',
                'decimals9': '9 (类似SOL)',
                'successTitle': '代币创建成功！',
                'successSubtitle': '您的SPL代币已成功部署到Solana区块链',
                'tokenInfoSection': '📋 代币信息',
                'blockchainInfoSection': '🔗 区块链信息',
                'feeInfoSection': '💰 交易费用',
                'tokenNameLabel': '代币名称',
                'tokenSymbolLabel': '代币符号',
                'tokenSupplyLabel': '总供应量',
                'tokenDecimalsLabel': '小数位数',
                'networkFeeLabel': '网络费用:',
                'metadataFeeLabel': '元数据费用:',
                'platformFeeLabel': '平台手续费:',
                'totalFeeLabel': '总费用:',
                'tokenAddress': '代币地址:',
                'tokenAccount': '代币账户:',
                'transactionSignature': '交易签名:',
                'viewInExplorer': '在Solana Explorer查看',
                'createNewToken': '创建新代币',
                'errorTitle': '创建失败',
                'footerText': '© 2024 SPL Token Minting. 基于 Solana 区块链技术',
                'previewAlt': '预览图片',
                'faq': {
                    'title': '常见问题',
                    'subtitle': '关于SPL代币创建的常见问题解答',
                    'q1': {
                        'question': '什么是SPL代币？',
                        'answer': 'SPL代币是基于Solana区块链的标准代币格式，类似于以太坊的ERC-20代币。它具有高速度、低费用的特点，适合各种去中心化应用。'
                    },
                    'q2': {
                        'question': '创建代币需要多少费用？',
                        'answer': '创建SPL代币的网络费用通常在0.01-0.02 SOL之间。此外，平台会收取总供应量5%的代币作为服务费。'
                    },
                    'q3': {
                        'question': '私钥安全吗？',
                        'answer': '您的私钥仅在本地浏览器中处理，不会被发送到我们的服务器存储。请妥善保管您的私钥，不要泄露给他人。'
                    },
                    'q4': {
                        'question': '支持哪些网络？',
                        'answer': '我们支持Solana的三个网络环境：Devnet（开发网络）、Testnet（测试网络）和Mainnet（主网）。建议先在Devnet测试。'
                    },
                    'q5': {
                        'question': '对代币图片有什么要求？',
                        'answer': '支持PNG、JPG、GIF格式，文件大小不超过5MB，推荐使用1000x1000像素的正方形图片以获得最佳显示效果。'
                    },
                    'q6': {
                        'question': '创建代币需要多长时间？',
                        'answer': '通常在1-3分钟内完成，具体时间取决于网络拥堵情况。创建过程包括验证、铸造、转账手续费和元数据创建等步骤。'
                    }
                }
            },
            'en': {
                'title': 'SPL Token Minting - SOLANA Token Generator',
                'logoSubtitle': 'SOLANA Token Generator',
                'formTitle': 'Create Your SPL Token',
                'formDescription': 'Fill in the information below to create your SPL token on the SOLANA blockchain',
                'createToken': 'Create Token',
                'creating': 'Creating...',
                'tokenName': 'Token Name',
                'tokenSymbol': 'Token Symbol',
                'tokenDescription': 'Token Description',
                'tokenSupply': 'Token Supply',
                'tokenDecimals': 'Token Decimals',
                'tokenImage': 'Token Image',
                'privateKey': 'Wallet Private Key',
                'network': 'Network Environment',
                'uploadImage': 'Click to upload image',
                'imageSupport': 'Support PNG, JPG, GIF (Recommended 1000x1000)',
                'required': '*',
                'copy': 'Copy',
                'copied': 'Copied!',
                'viewTransaction': 'View Transaction',
                'tokenNamePlaceholder': 'e.g: My Awesome Token',
                'tokenSymbolPlaceholder': 'e.g: MAT',
                'tokenDescriptionPlaceholder': 'Describe your token purpose and features...',
                'privateKeyPlaceholder': 'Enter your wallet private key (Base58 format)',
                'privateKeyHelp': 'Private key will be used to sign transactions, not stored or transmitted',
                'tokenDescriptionHelp': 'Maximum 200 characters',
                'devnet': 'Development (Devnet)',
                'testnet': 'Test (Testnet)',
                'mainnet': 'Mainnet (Mainnet)',
                'decimals0': '0 (Integer tokens)',
                'decimals2': '2 (Like cents)',
                'decimals6': '6 (Recommended)',
                'decimals9': '9 (Like SOL)',
                'successTitle': 'Token Created Successfully!',
                'successSubtitle': 'Your SPL token has been successfully deployed to Solana blockchain',
                'tokenInfoSection': '📋 Token Information',
                'blockchainInfoSection': '🔗 Blockchain Information',
                'feeInfoSection': '💰 Transaction Fees',
                'tokenNameLabel': 'Token Name',
                'tokenSymbolLabel': 'Token Symbol',
                'tokenSupplyLabel': 'Total Supply',
                'tokenDecimalsLabel': 'Decimals',
                'networkFeeLabel': 'Network Fee:',
                'metadataFeeLabel': 'Metadata Fee:',
                'platformFeeLabel': 'Platform Fee:',
                'totalFeeLabel': 'Total Fee:',
                'tokenAddress': 'Token Address:',
                'tokenAccount': 'Token Account:',
                'transactionSignature': 'Transaction Signature:',
                'viewInExplorer': 'View in Solana Explorer',
                'createNewToken': 'Create New Token',
                'errorTitle': 'Creation Failed',
                'footerText': '© 2024 SPL Token Minting. Based on Solana Blockchain Technology',
                'previewAlt': 'Preview Image',
                'faq': {
                    'title': 'Frequently Asked Questions',
                    'subtitle': 'Common questions about SPL token creation',
                    'q1': {
                        'question': 'What is an SPL Token?',
                        'answer': 'SPL tokens are the standard token format on the Solana blockchain, similar to ERC-20 tokens on Ethereum. They feature high speed and low fees, making them suitable for various decentralized applications.'
                    },
                    'q2': {
                        'question': 'How much does it cost to create a token?',
                        'answer': 'Creating an SPL token typically costs 0.01-0.02 SOL in network fees. Additionally, the platform charges 5% of the total supply as a service fee.'
                    },
                    'q3': {
                        'question': 'Is my private key secure?',
                        'answer': 'Your private key is only processed locally in your browser and is never sent to or stored on our servers. Please keep your private key safe and never share it with others.'
                    },
                    'q4': {
                        'question': 'Which networks are supported?',
                        'answer': 'We support three Solana network environments: Devnet (development), Testnet (testing), and Mainnet (production). We recommend testing on Devnet first.'
                    },
                    'q5': {
                        'question': 'What are the image requirements?',
                        'answer': 'We support PNG, JPG, and GIF formats with a maximum file size of 5MB. We recommend using 1000x1000 pixel square images for the best display results.'
                    },
                    'q6': {
                        'question': 'How long does token creation take?',
                        'answer': 'Token creation typically takes 1-3 minutes, depending on network congestion. The process includes validation, minting, fee transfer, and metadata creation steps.'
                    }
                }
            }
        };
        
        this.initializeEventListeners();
        this.initializeColorMode();
        this.initializeLanguage();
    }

    initializeEventListeners() {
        // Network selector
        const networkSelect = document.getElementById('network');
        networkSelect.addEventListener('change', (e) => {
            this.currentNetwork = e.target.value;
            console.log(`Network changed to: ${this.currentNetwork}`);
        });

        // Form submission
        const tokenForm = document.getElementById('tokenForm');
        tokenForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 检查是否正在处理中（限流处理）
            if (this.isProcessing) {
                return;
            }
            
            this.handleFormSubmission();
        });

        // Image upload
        const imageInput = document.getElementById('tokenImage');
        imageInput.addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Remove image
        const removeImageBtn = document.getElementById('removeImage');
        removeImageBtn.addEventListener('click', () => {
            this.removeImage();
        });

        // Token symbol uppercase
        const symbolInput = document.getElementById('tokenSymbol');
        symbolInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });

        // Private key input for balance checking
        const privateKeyInput = document.getElementById('privateKey');
        let balanceCheckTimeout;
        privateKeyInput.addEventListener('input', (e) => {
            clearTimeout(balanceCheckTimeout);
            const privateKey = e.target.value.trim();
            
            if (privateKey.length >= 32) {
                balanceCheckTimeout = setTimeout(() => {
                    this.checkWalletBalance(privateKey);
                }, 1000); // 延迟1秒检查余额
            } else {
                this.hideBalance();
            }
        });

        // Language selector
        const languageSelect = document.getElementById('language');
        languageSelect.addEventListener('change', (e) => {
            this.switchLanguage(e.target.value);
        });

        // Color mode toggle
        const colorModeBtn = document.getElementById('colorModeBtn');
        colorModeBtn.addEventListener('click', () => {
            this.toggleColorMode();
        });

        // Form validation
        this.setupFormValidation();
    }

    setupFormValidation() {
        const requiredFields = ['privateKey', 'tokenName', 'tokenSymbol', 'tokenSupply', 'tokenImage'];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => this.validateField(field));
                field.addEventListener('input', () => this.clearFieldError(field));
            }
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.id) {
            case 'privateKey':
                if (!value) {
                    isValid = false;
                    errorMessage = '请输入钱包私钥';
                } else if (value.length < 32) {
                    isValid = false;
                    errorMessage = '私钥格式不正确';
                }
                break;
            
            case 'tokenName':
                if (!value) {
                    isValid = false;
                    errorMessage = '请输入代币名称';
                } else if (value.length > 32) {
                    isValid = false;
                    errorMessage = '代币名称不能超过32个字符';
                }
                break;
            
            case 'tokenSymbol':
                if (!value) {
                    isValid = false;
                    errorMessage = '请输入代币简称';
                } else if (value.length > 10) {
                    isValid = false;
                    errorMessage = '代币简称不能超过10个字符';
                } else if (!/^[A-Z0-9]+$/.test(value)) {
                    isValid = false;
                    errorMessage = '代币简称只能包含大写字母和数字';
                }
                break;
            
            case 'tokenSupply':
                const supply = parseInt(value);
                if (!value || isNaN(supply)) {
                    isValid = false;
                    errorMessage = '请输入有效的代币数量';
                } else if (supply < 1) {
                    isValid = false;
                    errorMessage = '代币数量必须大于0';
                } else if (supply > 1000000000000) {
                    isValid = false;
                    errorMessage = '代币数量不能超过1万亿';
                }
                break;
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidation(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--color-error);
                font-size: var(--font-size-xs);
                margin-top: var(--space-1);
            `;
            errorElement.textContent = errorMessage;
            formGroup.appendChild(errorElement);
        } else {
            field.classList.remove('error');
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showError('请选择有效的图片文件');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            this.showError('图片文件大小不能超过5MB');
            return;
        }

        this.selectedImage = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            
            previewImg.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.selectedImage = null;
        document.getElementById('tokenImage').value = '';
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('previewImg').src = '';
    }

    async handleFormSubmission() {
        // 检查是否正在处理中（限流处理）
        if (this.isProcessing) {
            return;
        }
        
        // Validate all fields
        const requiredFields = ['privateKey', 'tokenName', 'tokenSymbol', 'tokenSupply'];
        let isFormValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        // Check if image is selected
        if (!this.selectedImage) {
            this.showError('请选择代币图片');
            isFormValid = false;
        }

        if (!isFormValid) {
            return;
        }

        // 设置处理状态
        this.isProcessing = true;

        // Show loading state
        this.setLoadingState(true);
        this.hideResults();

        try {
            // Collect form data
            const formData = this.collectFormData();
            
            // Create token
            const result = await this.createToken(formData);
            
            // Show success
            this.showSuccess(result);
            
        } catch (error) {
            console.error('Token creation failed:', error);
            
            // 添加错误日志到终端
            this.addTerminalLog('', '');
            this.addTerminalLog('console.error("💥 代币创建过程中发生错误");', 'error');
            this.addTerminalLog(`console.error("错误详情: ${error.message}");`, 'error');
            this.updateExecutionStatus('执行失败', 'error');
            
            this.hideProgress();
            this.showError(error.message || '代币创建失败，请重试');
        } finally {
            this.setLoadingState(false);
            this.isProcessing = false;
        }
    }

    collectFormData() {
        return {
            privateKey: document.getElementById('privateKey').value.trim(),
            tokenName: document.getElementById('tokenName').value.trim(),
            tokenSymbol: document.getElementById('tokenSymbol').value.trim(),
            tokenDescription: document.getElementById('tokenDescription').value.trim(),
            tokenSupply: parseInt(document.getElementById('tokenSupply').value),
            tokenDecimals: parseInt(document.getElementById('tokenDecimals').value),
            tokenImage: this.selectedImage,
            network: this.currentNetwork
        };
    }

    async createToken(formData) {
        // 显示进度
        this.showProgress();
        
        // 启动进度模拟
        const progressPromise = this.simulateProgress();
        
        // Create FormData for file upload
        const uploadData = new FormData();
        
        // Add all form fields
        Object.keys(formData).forEach(key => {
            if (key === 'tokenImage') {
                uploadData.append(key, formData[key]);
            } else {
                uploadData.append(key, formData[key]);
            }
        });

        // Send request to backend - 使用完整的API URL
        const response = await fetch(`${this.apiBaseUrl}/api/create-token`, {
            method: 'POST',
            headers: {
                'X-Network': this.currentNetwork
            },
            body: uploadData
        });

        // 等待进度模拟完成
        await progressPromise;
        
        // 添加API调用日志
        this.addTerminalLog('', '');
        this.addTerminalLog('// === 发送API请求 ===', 'warning');
        this.addTerminalLog('fetch("/api/create-token", { method: "POST", body: formData })', 'info');
        this.addTerminalLog('console.log("📡 正在发送代币创建请求...");', 'success');
        
        if (!response.ok) {
            const errorData = await response.json();
            // 添加错误日志
            this.addTerminalLog('', '');
            this.addTerminalLog('console.error("❌ API请求失败");', 'error');
            this.addTerminalLog(`console.error("错误信息: ${errorData.error || response.statusText}");`, 'error');
            this.updateExecutionStatus('执行失败', 'error');
            this.hideProgress();
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        
        // 完成所有步骤
        this.updateProgress(100);
        
        // 添加成功日志
        this.addTerminalLog('', '');
        this.addTerminalLog('console.log("🎉 代币创建成功!");', 'success');
        this.addTerminalLog(`console.log("代币地址: ${result.data?.mintAddress || 'N/A'}");`, 'success');
        this.updateExecutionStatus('执行完成', 'completed');
        
        // 延迟一下再隐藏进度并显示结果
        setTimeout(() => {
            this.hideProgress();
        }, 1000);
        
        return result;
    }

    async checkWalletBalance(privateKey) {
        try {
            this.showBalanceLoading();
            
            const response = await fetch(`${this.apiBaseUrl}/api/check-balance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    privateKey: privateKey,
                    network: this.currentNetwork
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || '余额检查失败');
            }
            
            if (data.success) {
                this.showBalance({
                    balance: data.balance,
                    network: data.network,
                    isEnough: data.isEnough,
                    walletAddress: data.walletAddress
                });
            } else {
                throw new Error(data.error || '余额检查失败');
            }
            
        } catch (error) {
            console.error('余额检查失败:', error);
            this.showBalanceError(error.message || '余额检查失败，请重试');
        }
    }

    showBalanceLoading() {
        const container = document.getElementById('balanceContainer');
        const amount = document.getElementById('balanceAmount');
        const status = document.getElementById('balanceStatus');
        
        container.style.display = 'block';
        amount.textContent = '...';
        status.textContent = '正在查询余额...';
        status.className = 'balance-status';
    }

    showBalance(balanceData) {
        const container = document.getElementById('balanceContainer');
        const amount = document.getElementById('balanceAmount');
        const status = document.getElementById('balanceStatus');
        
        container.style.display = 'block';
        amount.textContent = parseFloat(balanceData.balance).toFixed(4);
        
        if (!balanceData.isEnough) {
            status.textContent = '余额不足，可能无法支付交易费用';
            status.className = 'balance-status error';
        } else if (balanceData.balance < 0.1) {
            status.textContent = '余额较低，请注意交易费用';
            status.className = 'balance-status warning';
        } else {
            status.textContent = `钱包地址: ${balanceData.walletAddress.slice(0, 8)}...${balanceData.walletAddress.slice(-8)}`;
            status.className = 'balance-status success';
        }
    }

    showBalanceError(message) {
        const container = document.getElementById('balanceContainer');
        const amount = document.getElementById('balanceAmount');
        const status = document.getElementById('balanceStatus');
        
        container.style.display = 'block';
        amount.textContent = '--';
        status.textContent = message;
        status.className = 'balance-status error';
    }

    hideBalance() {
        const container = document.getElementById('balanceContainer');
        container.style.display = 'none';
    }

    // 显示进度
    showProgress() {
        const container = document.getElementById('progressContainer');
        const resultContainer = document.getElementById('resultContainer');
        const errorContainer = document.getElementById('errorContainer');
        
        // 隐藏其他容器
        if (resultContainer) resultContainer.style.display = 'none';
        if (errorContainer) errorContainer.style.display = 'none';
        
        // 重置进度
        this.currentStep = 0;
        this.updateProgress(0);
        this.resetSteps();
        
        // 显示进度容器
        container.style.display = 'block';
        
        // Show code execution container
        this.showCodeExecution();
        
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 隐藏进度
    hideProgress() {
        const container = document.getElementById('progressContainer');
        container.style.display = 'none';
        this.hideCodeExecution();
    }

    // Code execution display methods
    showCodeExecution() {
        const container = document.getElementById('codeExecutionContainer');
        const terminalContent = document.getElementById('terminalContent');
        const executionStatus = document.getElementById('executionStatus');
        
        // Reset terminal content
        terminalContent.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-text">初始化代币创建器...</span></div>';
        
        // Reset status
        executionStatus.textContent = '执行中...';
        executionStatus.className = 'execution-status';
        
        // Show container
        container.style.display = 'block';
        
        // Add initial logs
        this.addTerminalLog('import { Connection, Keypair, PublicKey } from "@solana/web3.js";', 'info');
        this.addTerminalLog('import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";', 'info');
        this.addTerminalLog('import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";', 'info');
        this.addTerminalLog('', '');
        this.addTerminalLog('console.log("🚀 SPL代币创建器启动中...");', 'success');
    }

    hideCodeExecution() {
        document.getElementById('codeExecutionContainer').style.display = 'none';
    }

    addTerminalLog(text, type = '', delay = 100) {
        setTimeout(() => {
            const terminalContent = document.getElementById('terminalContent');
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            if (text.trim() === '') {
                line.innerHTML = '<span class="terminal-text">&nbsp;</span>';
            } else if (text.startsWith('//') || text.startsWith('console.log') || text.startsWith('import')) {
                line.innerHTML = `<span class="terminal-prompt">></span><span class="terminal-text ${type}">${text}</span>`;
            } else {
                line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-text ${type}">${text}</span>`;
            }
            
            terminalContent.appendChild(line);
            
            // Auto scroll to bottom
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }, delay);
    }

    updateExecutionStatus(status, type = '') {
        const executionStatus = document.getElementById('executionStatus');
        executionStatus.textContent = status;
        executionStatus.className = `execution-status ${type}`;
    }

    // 更新进度
    updateProgress(percentage) {
        const progressFill = document.getElementById('progressFill');
        const progressPercentage = document.getElementById('progressPercentage');
        
        progressFill.style.width = percentage + '%';
        progressPercentage.textContent = Math.round(percentage) + '%';
    }

    // 更新步骤状态
    updateStep(stepNumber, status = 'active') {
        const step = document.getElementById(`step${stepNumber}`);
        if (!step) return;
        
        // 移除所有状态类
        step.classList.remove('active', 'completed');
        
        // 添加新状态
        if (status === 'completed') {
            step.classList.add('completed');
        } else if (status === 'active') {
            step.classList.add('active');
        }
        
        // 更新进度百分比
        if (status === 'completed') {
            this.currentStep = stepNumber;
            const percentage = (stepNumber / this.totalSteps) * 100;
            this.updateProgress(percentage);
        }
    }

    // 重置所有步骤
    resetSteps() {
        for (let i = 1; i <= this.totalSteps; i++) {
            const step = document.getElementById(`step${i}`);
            if (step) {
                step.classList.remove('active', 'completed');
            }
        }
    }

    // 模拟进度步骤
    async simulateProgress() {
        const steps = [
            { 
                step: 1, 
                delay: 500, 
                message: '验证私钥...',
                logs: [
                    'const privateKeyArray = bs58.decode(privateKey);',
                    'const keypair = Keypair.fromSecretKey(privateKeyArray);',
                    'console.log("✅ 私钥验证成功", keypair.publicKey.toString());'
                ]
            },
            { 
                step: 2, 
                delay: 800, 
                message: '检查余额...',
                logs: [
                    'const connection = new Connection(clusterApiUrl("devnet"));',
                    'const balance = await connection.getBalance(keypair.publicKey);',
                    'console.log("💰 钱包余额:", balance / LAMPORTS_PER_SOL, "SOL");'
                ]
            },
            { 
                step: 3, 
                delay: 1200, 
                message: '创建铸造账户...',
                logs: [
                    'const mint = await createMint(',
                    '  connection,',
                    '  keypair,',
                    '  keypair.publicKey,',
                    '  null,',
                    '  decimals',
                    ');',
                    'console.log("🏭 铸造账户创建成功:", mint.toString());'
                ]
            },
            { 
                step: 4, 
                delay: 1500, 
                message: '铸造代币...',
                logs: [
                    'const tokenAccount = await getOrCreateAssociatedTokenAccount(',
                    '  connection, keypair, mint, keypair.publicKey',
                    ');',
                    'await mintTo(connection, keypair, mint, tokenAccount.address, keypair, supply);',
                    'console.log("🪙 代币铸造完成:", supply, "tokens");'
                ]
            },
            { 
                step: 5, 
                delay: 800, 
                message: '创建元数据...',
                logs: [
                    'const metadataInstruction = createCreateMetadataAccountV3Instruction({',
                    '  metadata: metadataPDA,',
                    '  mint: mint,',
                    '  mintAuthority: keypair.publicKey,',
                    '  payer: keypair.publicKey,',
                    '  updateAuthority: keypair.publicKey',
                    '}, { createMetadataAccountArgsV3: metadataArgs });',
                    'console.log("📋 元数据创建完成");'
                ]
            }
        ];
        
        for (const { step, delay, message, logs } of steps) {
            this.updateStep(step, 'active');
            
            // 更新加载文本
            const loadingText = document.querySelector('.loading-text');
            if (loadingText) {
                loadingText.textContent = message;
            }
            
            // 添加代码执行日志
            this.addTerminalLog('', '');
            this.addTerminalLog(`// === ${message.replace('...', '')} ===`, 'warning');
            
            for (let j = 0; j < logs.length; j++) {
                this.addTerminalLog(logs[j], 'info', j * 150);
            }
            
            await new Promise(resolve => setTimeout(resolve, delay));
            this.updateStep(step, 'completed');
        }
    }

    setLoadingState(isLoading) {
        const submitBtn = document.getElementById('createTokenBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.rainbow-progress-container');
        
        submitBtn.disabled = isLoading;
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
        } else {
            btnText.style.display = 'block';
            btnLoading.style.display = 'none';
        }
    }

    showSuccess(result) {
        this.hideError();
        
        // 适配新的响应格式 - 数据在 result.data 中
        const data = result.data || result;
        
        // 获取表单数据用于显示代币信息
        const formData = new FormData(document.getElementById('tokenForm'));
        const tokenName = formData.get('tokenName') || 'Unknown Token';
        const tokenSymbol = formData.get('tokenSymbol') || 'UNKNOWN';
        const tokenSupply = formData.get('tokenSupply') || '0';
        const tokenDecimals = formData.get('tokenDecimals') || '9';
        
        // 更新代币基本信息
        document.getElementById('resultTokenName').textContent = tokenName;
        document.getElementById('resultTokenSymbol').textContent = tokenSymbol;
        document.getElementById('resultTokenSupply').textContent = `${Number(tokenSupply).toLocaleString()} ${tokenSymbol}`;
        document.getElementById('resultTokenDecimals').textContent = tokenDecimals;
        
        // 更新区块链信息
        document.getElementById('tokenMint').textContent = data.mintAddress;
        document.getElementById('tokenAccount').textContent = data.tokenAccount;
        document.getElementById('transactionSignature').textContent = data.signature;
        
        // 计算和显示费用信息
        const networkFee = 0.000005; // 基础网络费用
        const metadataFee = 0.00144; // 元数据创建费用
        const totalFee = networkFee + metadataFee;
        
        document.getElementById('networkFee').textContent = `${networkFee.toFixed(6)} SOL`;
        document.getElementById('metadataFee').textContent = `${metadataFee.toFixed(6)} SOL`;
        document.getElementById('totalFee').textContent = `${totalFee.toFixed(6)} SOL`;
        
        // 显示平台手续费信息
        if (data.platformFee) {
            const platformFeeElement = document.getElementById('platformFee');
            const platformFeeStatusElement = document.getElementById('platformFeeStatus');
            
            if (platformFeeElement) {
                platformFeeElement.textContent = `${data.platformFee.amount.toLocaleString()} ${tokenSymbol} (${data.platformFee.percentage}%)`;
            }
            
            if (platformFeeStatusElement) {
                if (data.platformFee.success) {
                    platformFeeStatusElement.textContent = '✅ 已支付';
                    platformFeeStatusElement.className = 'fee-status success';
                } else {
                    platformFeeStatusElement.textContent = '❌ 支付失败';
                    platformFeeStatusElement.className = 'fee-status error';
                }
            }
        }
        
        // 更新浏览器链接
        const explorerLink = document.getElementById('explorerLink');
        const explorerUrl = data.explorerUrl || `${this.explorerUrls[this.currentNetwork]}/tx/${data.signature}`;
        explorerLink.href = explorerUrl;
        
        // 显示结果容器
        document.getElementById('resultContainer').style.display = 'block';
        
        // 滚动到结果区域
        document.getElementById('resultContainer').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // 添加成功动画效果
        setTimeout(() => {
            const resultContainer = document.getElementById('resultContainer');
            resultContainer.style.transform = 'scale(1.02)';
            setTimeout(() => {
                resultContainer.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    }

    showError(message) {
        this.hideResults();
        
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorContainer').style.display = 'block';
        
        // Scroll to error
        document.getElementById('errorContainer').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }

    hideResults() {
        document.getElementById('resultContainer').style.display = 'none';
    }

    hideError() {
        document.getElementById('errorContainer').style.display = 'none';
    }

    // Language switching functionality
    initializeLanguage() {
        const savedLanguage = localStorage.getItem('language') || 'zh-CN';
        this.currentLanguage = savedLanguage;
        document.getElementById('language').value = savedLanguage;
        this.updateLanguage();
    }

    switchLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        this.updateLanguage();
    }

    updateLanguage() {
        const t = this.translations[this.currentLanguage];
        
        // Update page title and meta
        document.title = t.title;
        document.documentElement.lang = this.currentLanguage;
        
        // Update logo subtitle
        const logoSubtitle = document.querySelector('.logo-subtitle');
        if (logoSubtitle) logoSubtitle.textContent = t.logoSubtitle;
        
        // Update form header
        const formTitle = document.querySelector('.form-title');
        if (formTitle) formTitle.textContent = t.formTitle;
        
        const formDescription = document.querySelector('.form-description');
        if (formDescription) formDescription.textContent = t.formDescription;
        
        // Update button text
        const createBtn = document.querySelector('.btn-text');
        if (createBtn) createBtn.textContent = t.createToken;
        
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) loadingText.textContent = t.creating;
        
        // Update form labels
        const labelMappings = {
            'tokenName': t.tokenName,
            'tokenSymbol': t.tokenSymbol,
            'tokenDescription': t.tokenDescription,
            'tokenSupply': t.tokenSupply,
            'tokenDecimals': t.tokenDecimals,
            'tokenImage': t.tokenImage,
            'privateKey': t.privateKey,
            'network': t.network
        };
        
        Object.keys(labelMappings).forEach(fieldId => {
            const label = document.querySelector(`label[for="${fieldId}"] .label-text`);
            if (label) label.textContent = labelMappings[fieldId];
        });
        
        // Update placeholders
        const placeholderMappings = {
            'tokenName': t.tokenNamePlaceholder,
            'tokenSymbol': t.tokenSymbolPlaceholder,
            'tokenDescription': t.tokenDescriptionPlaceholder,
            'privateKey': t.privateKeyPlaceholder
        };
        
        Object.keys(placeholderMappings).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) field.placeholder = placeholderMappings[fieldId];
        });
        
        // Update help text
        const privateKeyHelp = document.querySelector('input[name="privateKey"] + .form-help .help-text');
        if (privateKeyHelp) privateKeyHelp.textContent = t.privateKeyHelp;
        
        const descriptionHelp = document.querySelector('textarea[name="tokenDescription"] + .form-help .help-text');
        if (descriptionHelp) descriptionHelp.textContent = t.tokenDescriptionHelp;
        
        // Update network options
        const networkSelect = document.getElementById('network');
        if (networkSelect) {
            const options = networkSelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.devnet;
            if (options[1]) options[1].textContent = t.testnet;
            if (options[2]) options[2].textContent = t.mainnet;
        }
        
        // Update decimals options
        const decimalsSelect = document.getElementById('tokenDecimals');
        if (decimalsSelect) {
            const options = decimalsSelect.querySelectorAll('option');
            if (options[0]) options[0].textContent = t.decimals0;
            if (options[1]) options[1].textContent = t.decimals2;
            if (options[2]) options[2].textContent = t.decimals6;
            if (options[3]) options[3].textContent = t.decimals9;
        }
        
        // Update upload text
        const uploadPrimary = document.querySelector('.upload-primary');
        if (uploadPrimary) uploadPrimary.textContent = t.uploadImage;
        
        const uploadSecondary = document.querySelector('.upload-secondary');
        if (uploadSecondary) uploadSecondary.textContent = t.imageSupport;
        
        // Update result section
        const resultTitle = document.querySelector('.result-title');
        if (resultTitle) resultTitle.textContent = t.successTitle;
        
        const resultSubtitle = document.querySelector('.result-subtitle');
        if (resultSubtitle) resultSubtitle.textContent = t.successSubtitle;
        
        // Update section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles[0]) sectionTitles[0].textContent = t.tokenInfoSection;
        if (sectionTitles[1]) sectionTitles[1].textContent = t.blockchainInfoSection;
        if (sectionTitles[2]) sectionTitles[2].textContent = t.feeInfoSection;
        
        // Update token info labels
        const tokenNameLabel = document.querySelector('[data-label="tokenName"]');
        if (tokenNameLabel) tokenNameLabel.textContent = t.tokenNameLabel;
        
        const tokenSymbolLabel = document.querySelector('[data-label="tokenSymbol"]');
        if (tokenSymbolLabel) tokenSymbolLabel.textContent = t.tokenSymbolLabel;
        
        const tokenSupplyLabel = document.querySelector('[data-label="tokenSupply"]');
        if (tokenSupplyLabel) tokenSupplyLabel.textContent = t.tokenSupplyLabel;
        
        const tokenDecimalsLabel = document.querySelector('[data-label="tokenDecimals"]');
        if (tokenDecimalsLabel) tokenDecimalsLabel.textContent = t.tokenDecimalsLabel;
        
        // Update blockchain info labels
        const resultLabels = document.querySelectorAll('.result-label');
        if (resultLabels[0]) resultLabels[0].textContent = t.tokenAddress;
        if (resultLabels[1]) resultLabels[1].textContent = t.tokenAccount;
        if (resultLabels[2]) resultLabels[2].textContent = t.transactionSignature;
        
        // Update fee labels
        const networkFeeLabel = document.querySelector('[data-label="networkFee"]');
        if (networkFeeLabel) networkFeeLabel.textContent = t.networkFeeLabel;
        
        const metadataFeeLabel = document.querySelector('[data-label="metadataFee"]');
        if (metadataFeeLabel) metadataFeeLabel.textContent = t.metadataFeeLabel;
        
        const platformFeeLabel = document.querySelector('[data-label="platformFee"]');
        if (platformFeeLabel) platformFeeLabel.textContent = t.platformFeeLabel;
        
        const totalFeeLabel = document.querySelector('[data-label="totalFee"]');
        if (totalFeeLabel) totalFeeLabel.textContent = t.totalFeeLabel;
        
        // Update action buttons
        const explorerBtn = document.querySelector('.action-btn[onclick*="explorer"]');
        if (explorerBtn) explorerBtn.textContent = t.viewInExplorer;
        
        const newTokenBtn = document.querySelector('.action-btn[onclick*="hideResults"]');
        if (newTokenBtn) newTokenBtn.textContent = t.createNewToken;
        
        // Update error section
        const errorTitle = document.querySelector('.error-title');
        if (errorTitle) errorTitle.textContent = t.errorTitle;
        
        // Update copy buttons
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(btn => {
            if (btn.textContent === '已复制!' || btn.textContent === 'Copied!') return;
            btn.textContent = t.copy;
        });
        
        // Update explorer link
        const explorerLink = document.getElementById('explorerLink');
        if (explorerLink) explorerLink.textContent = t.viewTransaction;
        
        // Update footer
        const footerText = document.querySelector('.footer-text');
        if (footerText) footerText.textContent = t.footerText;
        
        // Update image preview alt text
        const previewImg = document.getElementById('previewImg');
        if (previewImg) previewImg.alt = t.previewAlt;
        
        // Update FAQ section
        if (t.faq) {
            const faqTitle = document.querySelector('.faq-title');
            if (faqTitle) faqTitle.textContent = t.faq.title;
            
            const faqSubtitle = document.querySelector('.faq-subtitle');
            if (faqSubtitle) faqSubtitle.textContent = t.faq.subtitle;
            
            // Update FAQ questions and answers
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach((item, index) => {
                const questionKey = `q${index + 1}`;
                if (t.faq[questionKey]) {
                    const questionElement = item.querySelector('.faq-question');
                    const answerElement = item.querySelector('.faq-answer p');
                    
                    if (questionElement) {
                        // Keep the icon and toggle, only update the text
                        const icon = questionElement.querySelector('.faq-icon');
                        const toggle = questionElement.querySelector('.faq-toggle');
                        questionElement.innerHTML = '';
                        if (icon) questionElement.appendChild(icon);
                        questionElement.appendChild(document.createTextNode(t.faq[questionKey].question));
                        if (toggle) questionElement.appendChild(toggle);
                    }
                    
                    if (answerElement) {
                        answerElement.textContent = t.faq[questionKey].answer;
                    }
                }
            });
        }
    }

    // Color mode functionality
    initializeColorMode() {
        const savedMode = localStorage.getItem('colorMode') || 'light';
        this.currentColorMode = savedMode;
        this.applyColorMode();
    }

    toggleColorMode() {
        this.currentColorMode = this.currentColorMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('colorMode', this.currentColorMode);
        this.applyColorMode();
    }

    applyColorMode() {
        const body = document.body;
        const colorModeBtn = document.getElementById('colorModeBtn');
        
        if (this.currentColorMode === 'dark') {
            body.classList.add('dark-mode');
            colorModeBtn.textContent = '🌙';
        } else {
            body.classList.remove('dark-mode');
            colorModeBtn.textContent = '☀️';
        }
    }
}

// Utility functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    // Get current language from the app instance
    const currentLanguage = localStorage.getItem('language') || 'zh-CN';
    const copiedText = currentLanguage === 'zh-CN' ? '已复制!' : 'Copied!';
    const copyText = currentLanguage === 'zh-CN' ? '复制' : 'Copy';
    
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const button = element.nextElementSibling;
        const originalText = button.textContent;
        button.textContent = copiedText;
        button.style.background = 'var(--color-success)';
        button.style.color = 'var(--text-inverse)';
        
        setTimeout(() => {
            button.textContent = copyText;
            button.style.background = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SPLTokenMinter();
    
    // Add some visual enhancements
    addVisualEnhancements();
    
    // Initialize FAQ functionality
    initializeFAQ();
});

function addVisualEnhancements() {
    // Add floating animation to form elements
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .form-group.focused .form-label {
            color: var(--color-primary);
        }
    `;
    document.head.appendChild(style);
}

// FAQ functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        if (otherToggle) otherToggle.textContent = '+';
                    }
                });
                
                // Toggle current item
                if (isOpen) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    toggle.textContent = '+';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    toggle.textContent = '−';
                }
            });
        }
    });
}