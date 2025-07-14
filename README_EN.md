# SPL Token Minting - SOLANA Token Generator

![SPL Token Minting](img/AI%20Design.png)

## Project Overview

SPL Token Minting is a Solana blockchain-based token generator that allows users to easily create and deploy their own SPL tokens. This project provides an intuitive web interface with multi-language support (Chinese/English) and dark/light theme switching.

## Features

### 🚀 Core Features
- **Token Creation**: Support for creating SPL tokens on the Solana blockchain
- **Multi-Network Support**: Support for Development (Devnet), Test (Testnet), and Production (Mainnet) environments
- **Token Metadata**: Support for setting token name, symbol, description, and image
- **Flexible Configuration**: Customizable token supply and decimal places

### 🎨 User Interface
- **Responsive Design**: Compatible with desktop and mobile devices
- **Multi-Language Support**: Chinese and English interface switching
- **Theme Switching**: Support for light and dark themes
- **Dynamic Background**: Cool gradient animation background
- **Glassmorphism Effect**: Modern Glassmorphism design style

### 🔒 Security Features
- **Local Processing**: Private keys are processed locally and not uploaded to the server
- **Security Validation**: Complete form validation and error handling
- **Transaction Transparency**: Provides complete transaction information and blockchain explorer links

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables and animations
- **JavaScript (ES6+)**: Native JavaScript, no framework dependencies
- **Design System**: Unified design system based on CSS variables

### Backend
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **Multer**: File upload handling
- **CORS**: Cross-Origin Resource Sharing

### Blockchain
- **@solana/web3.js**: Solana blockchain interaction
- **@solana/spl-token**: SPL token operations
- **@metaplex-foundation/mpl-token-metadata**: Token metadata management

## Installation and Setup

### Requirements
- Node.js 16.0 or higher
- npm or yarn package manager

### Installation Steps

1. **Clone the Project**
   ```bash
   git clone <repository-url>
   cd spl-token-minting
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Access the Application**
   Open your browser and visit `http://localhost:3000`

## User Guide

### Token Creation Steps

1. **Select Network Environment**
   - Development (Devnet): For testing, tokens have no real value
   - Test (Testnet): For final testing
   - Production (Mainnet): Official deployment, requires real SOL

2. **Enter Wallet Private Key**
   - Use Base58 format private key
   - Ensure wallet has sufficient SOL for transaction fees

3. **Fill Token Information**
   - **Token Name**: Full token name (max 32 characters)
   - **Token Symbol**: Token symbol (max 10 characters, uppercase letters and numbers)
   - **Token Description**: Optional token description (max 200 characters)
   - **Token Supply**: Total token issuance
   - **Decimal Places**: Token precision (recommended 6 or 9 digits)

4. **Upload Token Image**
   - Supports PNG, JPG, GIF formats
   - Recommended size: 1000x1000 pixels
   - File size limit: 5MB

5. **Create Token**
   - Click "Create Token" button
   - Wait for transaction confirmation
   - Get token address and transaction information

### Important Notes

⚠️ **Important Reminders**:
- Creating tokens on Mainnet requires real SOL consumption
- Please keep your private key safe and do not share it with others
- It's recommended to test on Devnet first, then deploy on Mainnet after confirmation
- Token basic information cannot be modified after creation, please check carefully

## Project Structure

```
spl-token-minting/
├── img/                    # Image resources
│   ├── AI Design.png      # Project Logo
│   └── favicon_*.png      # Website icons
├── js/                     # JavaScript files
│   ├── main.js            # Main application logic
│   └── animation.js       # Animation effects
├── styles/                 # Style files
│   ├── design-system.css  # Design system
│   ├── main.css           # Main styles
│   └── animation.css      # Animation styles
├── uploads/                # Upload directory
├── index.html             # Main page
├── server.js              # Backend server
├── package.json           # Project configuration
├── README.md              # Project documentation (Chinese)
└── README_EN.md           # Project documentation (English)
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Balance Query
```
POST /api/check-balance
Content-Type: application/json

{
  "publicKey": "wallet public key",
  "network": "devnet|testnet|mainnet"
}
```

### Create Token
```
POST /api/create-token
Content-Type: multipart/form-data

{
  "privateKey": "wallet private key",
  "tokenName": "token name",
  "tokenSymbol": "token symbol",
  "tokenDescription": "token description",
  "tokenSupply": "token supply",
  "tokenDecimals": "decimal places",
  "network": "network environment",
  "tokenImage": "token image file"
}
```

## Network Configuration

The project supports three Solana network environments:

| Environment | Network | RPC Endpoint |
|-------------|---------|-------------|
| Development | Devnet | `https://falling-virulent-lake.solana-devnet.quiknode.pro/...` |
| Test | Testnet | `https://falling-virulent-lake.solana-testnet.quiknode.pro/...` |
| Production | Mainnet | `https://falling-virulent-lake.solana-mainnet.quiknode.pro/...` |

## Contributing

Welcome to submit Issues and Pull Requests to improve this project!

### Development Process
1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, please contact us through:

- Project Issues: [GitHub Issues](https://github.com/your-username/spl-token-minting/issues)
- Email: your-email@example.com

## Acknowledgments

Thanks to the Solana ecosystem and open source community for their support!

---

**Disclaimer**: This tool is for learning and research purposes only. When using this tool to create tokens, please comply with local laws and regulations. The developers are not responsible for any losses caused by using this tool.