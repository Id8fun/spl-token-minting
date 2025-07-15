# SPL Token Minting Tool - Frontend

这是SPL代币生成工具的前端部分，提供用户界面和交互功能。

## 🚀 独立部署说明

本前端项目已配置为独立仓库，可以单独部署到各种静态网站托管平台。

### 📦 仓库信息
- **前端仓库**: `https://github.com/lyrick/spl-token-minting.git`
- **后端仓库**: `https://github.com/lyrick/spl-token-back.git`

使用纯HTML、CSS和JavaScript构建。

## 📁 项目结构

```
frontend/
├── index.html              # 主页面
├── balance-checker.html     # 余额查询页面
├── js/
│   ├── main.js             # 主要业务逻辑
│   └── animation.js        # 动画效果
├── styles/
│   ├── main.css            # 主样式文件
│   ├── design-system.css   # 设计系统
│   └── animation.css       # 动画样式
└── img/                    # 图片资源
    └── favicon_*.png       # 网站图标
```

## 🚀 部署方式

### 1. Cloudflare Pages (推荐)

```bash
# 1. 登录 Cloudflare Dashboard
# 2. 进入 Pages 服务
# 3. 连接 GitHub 仓库
# 4. 设置构建配置：
#    - 构建命令: 无需构建
#    - 输出目录: frontend
#    - 根目录: frontend
```

### 2. Vercel

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 在 frontend 目录下部署
cd frontend
vercel --prod
```

### 3. Netlify

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 在 frontend 目录下部署
cd frontend
netlify deploy --prod --dir .
```

## ⚙️ 配置说明

### API 端点配置

在 `js/main.js` 中的 `getApiBaseUrl()` 方法需要根据后端部署地址进行配置：

```javascript
getApiBaseUrl() {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    
    // 本地开发环境
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3001';
    }
    
    // 生产环境 - 根据实际后端部署地址修改
    if (hostname === 'your-frontend-domain.com') {
        return 'https://your-backend-domain.com';
    }
    
    // 默认配置
    return `${protocol}//${hostname}:3001`;
}
```

### 环境变量

前端无需环境变量，所有配置都在代码中。

## 🔧 本地开发

```bash
# 启动本地服务器
python3 -m http.server 8080
# 或者
npx serve .

# 访问 http://localhost:8080
```

## 📝 功能特性

- ✅ 响应式设计，支持移动端
- ✅ 多语言支持（中文/英文）
- ✅ 深色/浅色主题切换
- ✅ 实时余额查询
- ✅ 代币创建进度显示
- ✅ 表单验证和错误处理
- ✅ 代码执行动画效果

## 🌐 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📞 技术支持

如有问题，请查看主项目的 README.md 文件或提交 Issue。