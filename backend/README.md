# SPL Token Minting Tool - Backend API

这是SPL代币生成工具的后端API服务，基于Node.js和Express框架构建。

## 🚀 独立部署说明

本后端项目已配置为独立仓库，可以单独部署到各种云服务平台。

### 📦 仓库信息
- **前端仓库**: `https://github.com/lyrick/spl-token-minting.git`
- **后端仓库**: `https://github.com/lyrick/spl-token-back.git`

## 📁 项目结构

```
backend/
├── server.js           # 主服务器文件
├── package.json        # 依赖配置
├── package-lock.json   # 锁定版本
└── uploads/            # 文件上传目录
    └── .gitkeep
```

## 🚀 部署方式

### 1. Vercel (推荐)

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 在 backend 目录下
cd backend

# 3. 创建 vercel.json 配置文件
# 4. 部署
vercel --prod
```

需要创建 `vercel.json` 配置文件：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```

### 2. Railway

```bash
# 1. 安装 Railway CLI
npm install -g @railway/cli

# 2. 登录并部署
railway login
railway deploy
```

### 3. Render

1. 连接 GitHub 仓库
2. 选择 backend 目录
3. 设置构建命令: `npm install`
4. 设置启动命令: `node server.js`

### 4. Cloudflare Workers

需要将 Express 应用转换为 Workers 格式，参考主项目文档。

## ⚙️ 环境变量

在部署平台设置以下环境变量：

```bash
# Solana RPC 端点 (可选，有默认值)
SOLANA_RPC_DEVNET=your_devnet_rpc_url
SOLANA_RPC_TESTNET=your_testnet_rpc_url
SOLANA_RPC_MAINNET=your_mainnet_rpc_url

# 平台手续费钱包地址 (可选)
PLATFORM_WALLET=your_platform_wallet_address

# 服务器端口 (可选，默认3001)
PORT=3001

# CORS 允许的域名 (可选)
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 🔧 本地开发

```bash
# 1. 安装依赖
cd backend
npm install

# 2. 启动开发服务器
npm start
# 或者
node server.js

# 服务器将在 http://localhost:3001 启动
```

## 📡 API 端点

### 健康检查
```
GET /api/health
```

### 余额查询
```
POST /api/check-balance
Content-Type: application/json

{
  "privateKey": "your_private_key",
  "network": "devnet|testnet|mainnet"
}
```

### 创建代币
```
POST /api/create-token
Content-Type: multipart/form-data

{
  "privateKey": "your_private_key",
  "tokenName": "Token Name",
  "tokenSymbol": "SYMBOL",
  "tokenSupply": "1000000",
  "tokenDecimals": "9",
  "tokenDescription": "Token description",
  "network": "devnet|testnet|mainnet",
  "tokenImage": File
}
```

### 获取代币信息
```
GET /api/token/:mintAddress
```

## 🔒 安全特性

- ✅ 私钥验证和格式检查
- ✅ 文件上传大小限制 (5MB)
- ✅ 支持的图片格式验证
- ✅ CORS 跨域保护
- ✅ 请求体大小限制
- ✅ 错误信息脱敏

## 💰 平台手续费

- 自动收取代币总供应量的 5% 作为平台手续费
- 手续费转入配置的平台钱包地址
- 支持通过环境变量自定义平台钱包

## 📦 依赖包

主要依赖：
- `express` - Web 框架
- `multer` - 文件上传处理
- `cors` - 跨域支持
- `@solana/web3.js` - Solana 区块链交互
- `@solana/spl-token` - SPL 代币操作
- `@metaplex-foundation/mpl-token-metadata` - 代币元数据

## 🐛 故障排除

### 常见问题

1. **端口占用**
   ```bash
   # 查找占用端口的进程
   lsof -i :3001
   # 杀死进程
   kill -9 <PID>
   ```

2. **依赖安装失败**
   ```bash
   # 清除缓存重新安装
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Solana RPC 连接失败**
   - 检查网络连接
   - 验证 RPC 端点是否可用
   - 确认 API 密钥是否正确

## 📞 技术支持

如有问题，请查看主项目的 README.md 文件或提交 Issue。