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
        
        this.initializeEventListeners();
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
}

// Utility functions
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary feedback
        const button = element.nextElementSibling;
        const originalText = button.textContent;
        button.textContent = '已复制!';
        button.style.background = 'var(--color-success)';
        button.style.color = 'var(--text-inverse)';
        
        setTimeout(() => {
            button.textContent = originalText;
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