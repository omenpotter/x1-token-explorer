# X1 Token Explorer 🪙

Live blockchain explorer for X1 network tokens. Connected to production API with real-time updates.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/x1-token-explorer)

## 🚀 Features

- ✅ 238+ tokens indexed from X1 blockchain
- ✅ Real-time updates via WebSocket
- ✅ Search by name, symbol, or mint address
- ✅ Verified token badges
- ✅ Scam warnings
- ✅ Creator information
- ✅ Direct links to X1 Explorer
- ✅ Responsive design

## 🌐 Live Demo

**Production:** https://x1-token-explorer.vercel.app *(your URL here)*

## 🔧 Tech Stack

- React 18
- X1 Production API (`http://45.94.81.202:3001`)
- WebSocket for real-time updates
- Deployed on Vercel

## 💻 Run Locally

```bash
npm install
npm start
```

Opens at `http://localhost:3000`

## 📦 Deploy Your Own

### Option 1: One-Click Vercel Deploy

Click the button above ⬆️

### Option 2: Manual Deploy

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/x1-token-explorer.git
git push -u origin main

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

## 🔌 API Connection

Connected to production X1 API:
```
API: http://45.94.81.202:3001
WebSocket: ws://45.94.81.202:3001
Database: 238+ tokens (live)
```

## 📊 API Endpoints Used

```javascript
GET  /api/tokens?limit=20&offset=0  // List tokens
GET  /api/search?q=query            // Search
WS   ws://45.94.81.202:3001         // Real-time updates
```

## 🤝 Contributing

Pull requests welcome! Please follow standard React conventions.

## 📄 License

MIT

## 🔗 Links

- [X1 Blockchain Explorer](https://explorer.mainnet.x1.xyz)
- [API Documentation](http://45.94.81.202:3001/health)

---

**Built with ❤️ for X1 blockchain community**
