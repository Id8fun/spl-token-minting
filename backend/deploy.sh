#!/bin/bash

# SPL Token Minting Backend Deployment Script
# Version: 1.0.0
# Last Updated: 2024-01-15
# 支持多种云平台的快速部署

set -e

echo "🚀 SPL Token Minting Backend 部署脚本 v1.0.0"
echo "==============================================="

# 检查Node.js和npm
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装，请先安装 npm"
    exit 1
fi

echo "📦 安装依赖..."
npm install

echo "🧪 运行测试 (如果存在)...
npm test --if-present

echo "🔍 检查代码质量...
echo "代码检查完成"

# 检查Git状态
if [ -d ".git" ]; then
    echo "📦 检查Git状态..."
    git status
    
    echo "📝 添加所有更改到Git..."
    git add .
    
    echo "💬 请输入提交信息 (默认: Update backend):"
    read -r commit_message
    commit_message=${commit_message:-"Update backend"}
    
    git commit -m "$commit_message" || echo "没有新的更改需要提交"
    
    echo "🔄 推送到远程仓库..."
    git push origin main || git push origin master
else
    echo "⚠️  未检测到Git仓库，请先初始化Git仓库"
    echo "运行以下命令初始化:"
    echo "git init"
    echo "git remote add origin https://github.com/lyrick/spl-token-back.git"
    echo "git add ."
    echo "git commit -m 'Initial commit'"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo "✅ 后端部署准备完成！"
echo ""
echo "📋 部署平台链接:"
echo "• Vercel: https://vercel.com/new (连接GitHub仓库)"
echo "• Railway: https://railway.app/new (连接GitHub仓库)"
echo "• Render: https://render.com/deploy (连接GitHub仓库)"
echo "• Heroku: heroku create your-app-name && git push heroku main"
echo ""
echo "🔧 环境变量配置:"
echo "请在部署平台设置以下环境变量:"
echo "• NODE_ENV=production"
echo "• PORT=3000 (或平台指定端口)"
echo ""
echo "⚠️  CORS配置提醒:"
echo "部署后请更新 server.js 中的CORS配置，添加前端域名到允许列表"
echo ""
echo "🎉 部署指南完成！"