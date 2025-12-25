
# 🌍 Alexara Travel Platform

A modern, AI-powered travel agency platform built with React, Vite, and Google Gemini.

## 🚀 Quick Deployment Guide (GitHub + Netlify)

### 1. GitHub Setup
- Create a new repository on [GitHub](https://github.com).
- Upload all project files **EXCEPT** `.env.local` and `node_modules`.
- Commit and push your changes.

### 2. Netlify Deployment
- Connect your GitHub account to [Netlify](https://app.netlify.com).
- Select your repository.
- **Build Settings:**
  - Build Command: `npm run build`
  - Publish Directory: `dist`

### 3. Adding your API Key (CRITICAL)
- In the Netlify deployment screen, go to **Site Configuration** > **Build & deploy** > **Environment**.
- Click **Add a variable**.
- **Key:** `GEMINI_API_KEY`
- **Value:** [Your Google Gemini API Key]
- Trigger a new deploy.

## 🛠️ Local Development
1. Clone the repo.
2. Run `npm install`.
3. Create a `.env.local` file with `GEMINI_API_KEY=your_key_here`.
4. Run `npm run dev`.

---
*Built for the next generation of global explorers.*
