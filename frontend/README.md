# Frontend - AtlasAI Web Application

This directory contains the complete frontend application for the AtlasAI decentralized network platform.

## 📁 Files

- **index.html** - Main HTML file with all 4 sections (Mission, Stats, Leaderboard, Explorer)
- **script.js** - Complete JavaScript functionality (2,302 lines)

## 🎯 Features

### Mission Section
- Data contribution interface
- File upload with drag & drop
- Wallet connection (Phantom)
- Real-time validation

### Stats Section
- Real-time platform statistics
- 6 statistic cards with live data
- Activity feed
- API integration with `/api/stats`

### Leaderboard
- Top contributors ranking
- User statistics display
- Interactive table

### Explorer
- Public data browsing
- Filter buttons (All, Images, Videos, Audio, Locations)
- Search functionality
- Data grid with pagination
- API integration with `/api/explorer`

## 🛠️ Technical Details

### JavaScript Functions
- `showSection(sectionId)` - Section switching
- `loadStatsData()` - Stats API integration
- `loadExplorerData(type, page)` - Explorer API integration
- `connectWallet()` - Phantom wallet connection
- `contributeData()` - Data submission
- `formatNumber(num)` - Number formatting
- `showNotification(message, type)` - UI notifications

### API Integration
- Real-time data loading
- Error handling
- Loading states
- Responsive design

## 🚀 Local Development

```bash
# Serve locally
python3 -m http.server 8000
# Open http://localhost:8000

# Or with Node.js
npx serve .
```

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Dependencies

- No external CSS frameworks
- Vanilla JavaScript
- Responsive CSS Grid/Flexbox
- Lucide icons
- Compatible with all modern browsers