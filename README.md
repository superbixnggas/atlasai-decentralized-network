# AtlasAI - Decentralized Robotic Data Network

A comprehensive Web3 platform for decentralized robotic data collection, validation, and distribution with blockchain integration.

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/superbixnggas/atlasai-decentralized-network.git
cd atlasai-decentralized-network

# Setup environment
cp config/.env.template .env
# Edit .env with your API keys

# Deploy (choose one)
bash scripts/deploy-railway.sh
# OR
bash scripts/deploy-heroku.sh
# OR
bash scripts/one-click-deploy.sh
```

## 📁 Project Structure

```
atlasai-decentralized-network/
├── frontend/           # Web application files
│   ├── index.html     # Main HTML
│   ├── script.js      # Frontend JavaScript
│   └── README.md      # Frontend documentation
├── backend/           # Server and API
│   └── enhanced-backend.js
├── scripts/           # Deployment scripts
│   ├── one-click-deploy.sh
│   ├── deploy-railway.sh
│   ├── deploy-heroku.sh
│   ├── quick-setup.sh
│   └── test-backend.sh
├── docs/              # Documentation
│   ├── README.md      # Project overview
│   ├── DEVELOPER_FINAL_GUIDE.md
│   ├── FEATURE_COMPLETION_REPORT.md
│   ├── FINAL_STATUS_REPORT.md
│   └── QUICK_DEPLOY_GUIDE.md
├── config/            # Configuration files
│   └── .env.template
└── package.json       # Node.js dependencies
```

## 🏗️ Architecture

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js RESTful API
- **Blockchain**: Solana integration
- **Storage**: IPFS decentralized storage
- **AI**: Quality validation system

## 📊 Features

- ✅ **Mission Section**: Data contribution interface
- ✅ **Stats Section**: Real-time platform statistics
- ✅ **Leaderboard**: Top contributors ranking
- ✅ **Explorer**: Public data browsing with filtering
- ✅ **Wallet Integration**: Phantom wallet support
- ✅ **Token System**: X402 token rewards
- ✅ **IPFS Storage**: Decentralized file storage
- ✅ **AI Validation**: Automated quality checking

## 🔗 API Endpoints

- `/api/stats` - Platform statistics
- `/api/explorer` - Data browsing with filtering
- `/api/missions` - Mission management
- `/api/leaderboard` - Top contributors
- `/api/users` - User management
- `/api/x402` - Token operations

## 🔧 Development

```bash
# Local development
bash scripts/quick-setup.sh
node backend/enhanced-backend.js

# Open http://localhost:3000
```

## 📝 Documentation

- [Developer Guide](docs/DEVELOPER_FINAL_GUIDE.md) - Complete setup guide
- [Feature Report](docs/FEATURE_COMPLETION_REPORT.md) - Implementation details
- [Status Report](docs/FINAL_STATUS_REPORT.md) - Testing results
- [Quick Deploy](docs/QUICK_DEPLOY_GUIDE.md) - Fast deployment

## 🔐 Environment Setup

Copy and configure environment variables:

```bash
cp config/.env.template .env
```

Required API keys:
- Solana RPC URL
- X402 Token Address
- OpenAI API Key
- Pinata IPFS API keys
- Database URL

## 🌐 Live Demo

- **Repository**: https://github.com/superbixnggas/atlasai-decentralized-network
- **Status**: 100% Complete & Production Ready
- **Testing**: All 13/13 tests passing

## 📝 License

MIT License - See LICENSE file for details.