# SPL Token Minting

![SPL Token Minting](frontend/img/AI%20Design.png)

生成SOLANA链上SPL代币工具，支持不同环境发布。采用前后端分离架构，便于独立部署和维护。

## 🌟 功能特性

- ✅ **多环境支持**: 开发环境(Devnet)、测试环境(Testnet)、正式环境(Mainnet)
- ✅ **完整代币创建**: 自动创建代币铸造账户、代币账户和元数据
- ✅ **图片上传**: 支持1000x1000代币图片上传
- ✅ **私钥导入**: 安全的钱包私钥导入功能
- ✅ **现代化UI**: 基于ID8FUN设计规范的响应式界面
- ✅ **实时验证**: 表单字段实时验证和错误提示
- ✅ **交易追踪**: 自动生成Solana Explorer链接
- ✅ **前后端分离**: 独立部署，便于扩展和维护

## 🏗️ 项目架构

本项目采用前后端分离架构：

- **Frontend**: 纯静态文件，可部署到 Cloudflare Pages、Vercel、Netlify 等
- **Backend**: Node.js API 服务，可部署到 Vercel、Railway、Render 等

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 本地开发

#### 1. 启动后端服务

```bash
cd backend
npm install
node server.js
```

后端服务将在 `http://localhost:3001` 启动。

#### 2. 启动前端服务

```bash
cd frontend
python3 -m http.server 8080
# 或者
npx serve .
```

前端服务将在 `http://localhost:8080` 启动。

### 生产部署

#### 前端部署 (推荐 Cloudflare Pages)

1. 将 `frontend/` 目录部署到 Cloudflare Pages
2. 设置构建配置：无需构建命令，输出目录为 `frontend`

#### 后端部署 (推荐 Vercel)

1. 将 `backend/` 目录部署到 Vercel
2. 已包含 `vercel.json` 配置文件
3. 设置必要的环境变量

详细部署说明请查看各目录下的 README.md 文件。

## 🌐 网络环境配置

项目支持三种Solana网络环境：开发环境(Devnet)、测试环境(Testnet)、正式环境(Mainnet)。

## 📝 使用流程

### 1. 选择网络环境
在页面顶部选择要部署的网络环境（开发/测试/正式）。

### 2. 填写代币信息
- **钱包私钥**: 输入用于签署交易的钱包私钥（Base58格式）
- **代币名称**: 代币的完整名称（最多32字符）
- **代币简称**: 代币符号（最多10字符，自动转换为大写）
- **代币简介**: 代币描述（可选，最多200字符）
- **代币总量**: 要铸造的代币数量
- **小数位数**: 代币的小数位数（0-9，推荐6或9）

### 3. 上传代币图片
- 支持 PNG、JPG、GIF 格式
- 推荐尺寸：1000x1000 像素
- 文件大小限制：5MB

### 4. 创建代币
点击"创建代币"按钮，系统将：
1. 验证钱包余额
2. 创建代币铸造账户
3. 创建代币账户
4. 铸造指定数量的代币
5. 创建链上元数据
6. 返回创建结果

### 5. 查看结果
创建成功后，您将获得：
- 代币地址（Mint Address）
- 代币账户地址
- 交易签名
- Solana Explorer 链接

## 🎨 设计规范

本项目遵循 ID8FUN 设计规范，采用现代化的设计系统：

### 颜色系统
- **主色调**: Solana 蓝色系 (#0ea5e9)
- **强调色**: 紫色系 (#a855f7)
- **成功色**: 绿色系 (#22c55e)
- **错误色**: 红色系 (#ef4444)
- **中性色**: 灰色系

### 字体系统
- **主字体**: Inter
- **等宽字体**: SF Mono / Monaco
- **字号**: 12px - 48px 响应式缩放

### 间距系统
- 基于 4px 网格系统
- 响应式间距适配

## 🔧 API 接口

### POST /api/create-token
创建SPL代币

**请求参数**:
- `privateKey`: 钱包私钥
- `tokenName`: 代币名称
- `tokenSymbol`: 代币符号
- `tokenDescription`: 代币描述（可选）
- `tokenSupply`: 代币总量
- `tokenDecimals`: 小数位数
- `tokenImage`: 代币图片文件
- `network`: 网络环境

**响应示例**:
```json
{
  "success": true,
  "message": "代币创建成功！",
  "mintAddress": "BNvDt1iYMAnmfBzF4cVnJN4pFjUT8F19Nz9dp5BWCbNW",
  "tokenAccount": "7W2EVikNqmvyA2rD9NyM7YWVygjYtnrKa5TzYGH27kzC",
  "signature": "3xcCfYjCoKoP6m5t1DM9gkxQRJGi4PVZUMgXery1eKzw...",
  "explorerUrl": "https://explorer.solana.com/tx/...",
  "tokenInfo": { ... }
}
```

### GET /api/token/:mintAddress
查询代币信息

**查询参数**:
- `network`: 网络环境（可选，默认devnet）

### GET /api/health
健康检查接口

## 📁 项目结构

```
spl-token-minting/
├── frontend/                    # 前端静态文件
│   ├── index.html              # 主页面
│   ├── balance-checker.html    # 余额查询页面
│   ├── js/                     # JavaScript 文件
│   │   ├── main.js             # 主要业务逻辑
│   │   └── animation.js        # 动画效果
│   ├── styles/                 # 样式文件
│   │   ├── main.css            # 主样式文件
│   │   ├── design-system.css   # 设计系统变量
│   │   └── animation.css       # 动画样式
│   ├── img/                    # 图片资源
│   └── README.md               # 前端部署说明
├── backend/                     # 后端 API 服务
│   ├── server.js               # Express 服务器
│   ├── package.json            # 项目配置
│   ├── package-lock.json       # 依赖锁定
│   ├── vercel.json             # Vercel 部署配置
│   ├── uploads/                # 上传文件目录
│   └── README.md               # 后端部署说明
├── README.md                    # 项目总览
├── DEPLOYMENT.md                # 部署指南
└── PROJECT_SUMMARY.md           # 项目总结
```

## 🔒 安全注意事项

1. **私钥安全**: 私钥仅在本地处理，不会被存储或传输到服务器
2. **网络选择**: 建议先在开发环境测试，确认无误后再部署到正式环境
3. **余额检查**: 确保钱包有足够的SOL支付交易费用
4. **文件验证**: 上传的图片文件会进行格式和大小验证

## 🛠️ 开发说明

### 依赖包说明
- `@solana/web3.js`: Solana Web3 SDK
- `@solana/spl-token`: SPL Token 程序
- `@metaplex-foundation/mpl-token-metadata`: 元数据程序
- `express`: Web 服务器框架
- `multer`: 文件上传中间件
- `cors`: 跨域资源共享
- `bs58`: Base58 编码解码



## 📞 技术支持

如遇到问题，请检查：
1. Node.js 版本是否符合要求
2. 网络连接是否正常
3. 钱包余额是否充足
4. 私钥格式是否正确

## 📄 许可证

MIT License

---

**注意**: 本工具仅用于学习和开发目的。在正式环境使用前，请充分测试并确保安全性。