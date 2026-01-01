# 🌍 Alexara: AI-Powered Travel Intelligence

Alexara is a high-end international travel platform that combines curated human expertise with next-generation AI planning via Google Gemini.

## 🚀 Deployment Guide

### Option 1: Vercel (Recommended)
1. **Push to GitHub**: Upload this project to a GitHub repository.
2. **Import to Vercel**: Connect your GitHub account and select the repository.
3. **Environment Variables**:
   - Go to **Project Settings** > **Environment Variables**.
   - Add **Key**: `API_KEY`
   - Add **Value**: `Your_Gemini_API_Key`
4. **Deploy**: Vercel will automatically detect the Vite build settings.

### Option 2: Netlify
1. **Push to GitHub**: Upload this project to a GitHub repository.
2. **New Site from Git**: Select your repo in the Netlify dashboard.
3. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - Go to **Site Configuration** > **Environment variables**.
   - Add **Key**: `API_KEY`
   - Add **Value**: `Your_Gemini_API_Key`
5. **Deploy**: Netlify will use the `_redirects` file included in this project to handle routing.

## 🧰 Tech Stack
- **Framework**: React 19 (Vite)
- **Intelligence**: Google Gemini 3 (Flash & Pro)
- **UI**: Tailwind CSS + Lucide Icons
- **Grounding**: Google Search via Gemini API

---
*Created for the Alexara Travel Group.*