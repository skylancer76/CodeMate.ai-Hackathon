# Vercel Deployment Guide

## Quick Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   - In Vercel dashboard, go to your project
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://codemateai-hackathon-production.up.railway.app`

3. **Deploy**
   - Vercel will automatically deploy from the `frontend/` directory
   - The `vercel.json` file is already configured

## Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Set environment variable
vercel env add VITE_API_URL
# Enter: https://codemateai-hackathon-production.up.railway.app
```

## Troubleshooting

### Backend Connection Issues
- Check if `VITE_API_URL` environment variable is set correctly
- Verify the Railway backend is running
- Check browser console for CORS errors

### Icon Not Showing
- Ensure `favicon.ico` is in the `public/` folder
- Clear browser cache
- Check if the file is being served correctly
