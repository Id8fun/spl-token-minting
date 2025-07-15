# 部署说明

## 生产环境部署指南

### 前端部署 (Cloudflare Pages)

1. 将项目推送到 GitHub 仓库
2. 在 Cloudflare Pages 中连接 GitHub 仓库
3. 设置构建配置：
   - 构建命令：无需构建命令（静态文件）
   - 输出目录：`/`（根目录）
   - 环境变量：无需设置

### 后端部署 (Cloudflare Workers 或其他服务)

#### 选项1：Cloudflare Workers

1. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

2. 登录 Cloudflare：
   ```bash
   wrangler login
   ```

3. 创建 `wrangler.toml` 配置文件：
   ```toml
   name = "spl-token-api"
   main = "server.js"
   compatibility_date = "2023-12-01"
   
   [vars]
   NODE_ENV = "production"
   ```

4. 部署：
   ```bash
   wrangler deploy
   ```

#### 选项2：其他云服务 (推荐)

由于 Cloudflare Workers 对 Node.js 模块支持有限，建议使用以下服务：

- **Vercel**：支持 Node.js，易于部署
- **Railway**：支持 Node.js，自动部署
- **Render**：免费层支持 Node.js
- **Heroku**：经典的 Node.js 部署平台

### API 端点配置

前端代码已配置为自动检测 API 端点：

- 本地开发：`http://localhost:3001`
- 生产环境：`https://solcoin.id8.fun/api`

如果您的后端部署在不同的域名，请修改 `js/main.js` 中的 `getApiBaseUrl()` 方法。

### 环境变量

确保在生产环境中设置以下环境变量：

```bash
NODE_ENV=production
PORT=3001
```

### 故障排除

#### 1. CORS 错误
如果遇到跨域问题，确保后端服务器正确配置了 CORS：

```javascript
app.use(cors({
    origin: ['https://solcoin.id8.fun', 'http://localhost:3000'],
    credentials: true
}));
```

#### 2. API 连接失败
- 检查后端服务是否正常运行
- 确认 API 端点 URL 配置正确
- 检查防火墙和安全组设置

#### 3. Solana 钱包错误
如果遇到 "Cannot assign to read only property 'solana'" 错误：
- 这是钱包扩展的正常行为
- 不影响功能使用
- 可以忽略此错误

### 推荐部署方案

1. **前端**：Cloudflare Pages（当前配置）
2. **后端**：Vercel 或 Railway
3. **域名配置**：
   - 前端：`solcoin.id8.fun`
   - 后端：`api.solcoin.id8.fun` 或 `solcoin.id8.fun/api`

### 部署检查清单

- [ ] 前端部署成功，可以访问
- [ ] 后端服务运行正常
- [ ] API 端点配置正确
- [ ] CORS 配置正确
- [ ] 环境变量设置完成
- [ ] 测试代币创建功能
- [ ] 检查手续费转账功能
- [ ] 验证所有网络环境（devnet, testnet, mainnet）