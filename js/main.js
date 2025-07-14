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
        this.apiBaseUrl = 'http://localhost:3000';
        
        this.currentNetwork = 'devnet';
        this.selectedImage = null;
        this.currentLanguage = 'zh-CN';
        this.currentColorMode = 'light';
        
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
                'tokenAddress': '代币地址:',
                'tokenAccount': '代币账户:',
                'transactionSignature': '交易签名:',
                'solanaExplorer': 'Solana Explorer:',
                'errorTitle': '创建失败',
                'footerText': '© 2024 SPL Token Minting. 基于 Solana 区块链技术',
                'previewAlt': '预览图片'
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
                'tokenAddress': 'Token Address:',
                'tokenAccount': 'Token Account:',
                'transactionSignature': 'Transaction Signature:',
                'solanaExplorer': 'Solana Explorer:',
                'errorTitle': 'Creation Failed',
                'footerText': '© 2024 SPL Token Minting. Based on Solana Blockchain Technology',
                'previewAlt': 'Preview Image'
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
            this.showError(error.message || '代币创建失败，请重试');
        } finally {
            this.setLoadingState(false);
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    }

    setLoadingState(isLoading) {
        const submitBtn = document.getElementById('createTokenBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
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
        
        // Update result fields
        document.getElementById('tokenMint').textContent = data.mintAddress;
        document.getElementById('tokenAccount').textContent = data.tokenAccount;
        document.getElementById('transactionSignature').textContent = data.signature;
        
        // Update explorer link
        const explorerLink = document.getElementById('explorerLink');
        const explorerUrl = data.explorerUrl || `${this.explorerUrls[this.currentNetwork]}/tx/${data.signature}`;
        explorerLink.href = explorerUrl;
        
        // Show result container
        document.getElementById('resultContainer').style.display = 'block';
        
        // Scroll to result
        document.getElementById('resultContainer').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
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
        
        const loadingText = document.querySelector('.btn-loading span');
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
        
        const resultLabels = document.querySelectorAll('.result-label');
        if (resultLabels[0]) resultLabels[0].textContent = t.tokenAddress;
        if (resultLabels[1]) resultLabels[1].textContent = t.tokenAccount;
        if (resultLabels[2]) resultLabels[2].textContent = t.transactionSignature;
        if (resultLabels[3]) resultLabels[3].textContent = t.solanaExplorer;
        
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