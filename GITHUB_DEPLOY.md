# 🚀 DEPLOY TO VERCEL VIA GITHUB (5 Minutes)

## Step 1: Push to GitHub (2 minutes)

```bash
# Extract the ZIP
unzip x1-production-explorer.zip
cd x1-production-explorer

# Initialize Git
git init
git add .
git commit -m "Initial commit - X1 Token Explorer"

# Create repo on GitHub:
# Go to: https://github.com/new
# Repo name: x1-token-explorer
# Make it Public
# Don't initialize with README

# Push to GitHub (replace YOUR_USERNAME)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/x1-token-explorer.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel (1 minute)

### Option A: One-Click Deploy Button

Add this to your GitHub README:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/x1-token-explorer)
```

Click the button → Vercel deploys automatically!

---

### Option B: Import from Vercel Dashboard

1. Go to: https://vercel.com/new
2. Click "Import Project"
3. Connect your GitHub account
4. Select `x1-token-explorer` repo
5. Click "Deploy"

**That's it!** Vercel auto-detects React and deploys.

---

### Option C: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

Vercel will link to your GitHub repo automatically.

---

## Step 3: Get Your Live URL

Vercel gives you:
```
https://x1-token-explorer.vercel.app
```

Or custom domain:
```
https://your-domain.com
```

---

## 🎯 What Vercel Does Automatically:

✅ Detects React app
✅ Runs `npm install`
✅ Runs `npm run build`
✅ Deploys to CDN
✅ Gives you HTTPS
✅ Auto-deploy on every git push
✅ Preview deployments for branches

---

## 🔧 Environment Variables (Optional)

If you want to change API URL later:

1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add:
   - Name: `REACT_APP_API_URL`
   - Value: `http://45.94.81.202:3001`
4. Redeploy

---

## 📱 GitHub + Vercel = Perfect Combo

Every time you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

Vercel automatically:
- ✅ Detects the push
- ✅ Builds your app
- ✅ Deploys to production
- ✅ Updates your live URL

---

## 🆘 Troubleshooting

**Issue: Vercel build fails**
- Check `package.json` has all dependencies
- Make sure `npm run build` works locally

**Issue: Can't connect to GitHub**
- Go to Vercel → Settings → Git Integration
- Reconnect GitHub

**Issue: API not working**
- Check CORS on your API server
- Vercel uses HTTPS, your API is HTTP (might need proxy)

---

## ✅ DONE!

Your app is now:
- ✅ On GitHub (version control)
- ✅ On Vercel (live production)
- ✅ Auto-deploying on every push
- ✅ Connected to your API

**URL: https://x1-token-explorer.vercel.app** 🎉
