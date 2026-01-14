# ⚡ QUICK DEPLOY TO GITHUB + VERCEL

## Copy-Paste These Commands:

```bash
# 1. Extract ZIP
unzip x1-production-explorer.zip
cd x1-production-explorer

# 2. Install dependencies
npm install

# 3. Initialize Git
git init
git add .
git commit -m "X1 Token Explorer - Initial commit"

# 4. Create GitHub repo
# Go to: https://github.com/new
# Repo name: x1-token-explorer
# Click "Create repository"

# 5. Push to GitHub (replace YOUR_USERNAME with your GitHub username)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/x1-token-explorer.git
git push -u origin main

# 6. Deploy to Vercel
# Go to: https://vercel.com/new
# Click "Import Project"
# Select your GitHub repo: x1-token-explorer
# Click "Deploy"
# DONE!
```

## 🎉 Your app will be live at:

```
https://x1-token-explorer.vercel.app
```

(Or custom URL that Vercel gives you)

---

## Alternative: Deploy via Vercel CLI

```bash
# After pushing to GitHub:
npm install -g vercel
vercel login
vercel --prod
```

Vercel will automatically link to your GitHub repo!

---

## 🔄 Auto-Deploy on Every Push

After initial setup, every time you:

```bash
git add .
git commit -m "Update feature"
git push
```

Vercel automatically rebuilds and redeploys! ✅

---

## 📱 Mobile Friendly

Access your deployed app from anywhere:
- Desktop: https://x1-token-explorer.vercel.app
- Mobile: Same URL!
- Tablet: Same URL!

All responsive and connected to your live API! 🚀
