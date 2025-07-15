#!/bin/bash

# SPL Token Minting Frontend Deployment Script
# Version: 1.0.0
# Last Updated: 2024-01-15
# 支持多种部署平台的快速部署

set -e

echo "🚀 SPL Token Minting Frontend 部署脚本 v1.0.0"
echo "==============================================="

# 检查Git状态
if [ -d ".git" ]; then
    echo "📦 检查Git状态..."
    git status
    
    echo "📝 添加所有更改到Git..."
    git add .
    
    echo "💬 请输入提交信息 (默认: Update frontend):"
    read -r commit_message
    commit_message=${commit_message:-"Update frontend"}
    
    git commit -m "$commit_message" || echo "没有新的更改需要提交"
    
    echo "🔄 推送到远程仓库..."
    git push origin main || git push origin master
else
    echo "⚠️  未检测到Git仓库，请先初始化Git仓库"
    echo "运行以下命令初始化:"
    echo "git init"
    echo "git remote add origin https://github.com/lyrick/spl-token-minting.git"
    echo "git add ."
    echo "git commit -m 'Initial commit'"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo "✅ 前端部署完成！"
echo ""
echo "📋 部署平台链接:"
echo "• Vercel: https://vercel.com/new (连接GitHub仓库)"
echo "• Netlify: https://app.netlify.com/start (连接GitHub仓库)"
echo "• Cloudflare Pages: https://dash.cloudflare.com/pages (连接GitHub仓库)"
echo ""
echo "🔧 配置API端点:"
echo "请确保在 js/main.js 中的 getApiBaseUrl() 方法配置正确的后端API地址"
echo "当前配置: 本地开发使用 http://localhost:3000"
echo "生产环境请修改为实际的后端API地址"

echo ""
echo "🎉 部署指南完成！"