# Deployment Guide

This guide covers how to deploy the Tyeetale Terminal to various hosting platforms.

## Option 1: Railway (Recommended - Full Stack)

Railway can host both frontend and backend together.

### Backend Deployment

1. Create a `Procfile` in the backend directory:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

2. Update `main.py` to handle Railway's port:
```python
import os
port = int(os.environ.get("PORT", 8000))
```

3. Push to Railway and it will auto-deploy.

### Frontend Deployment

1. Update the API URL in `frontend/src/hooks/useTerminal.ts`:
```typescript
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.railway.app' 
  : 'http://localhost:8000';
```

2. Railway will auto-deploy the frontend.

## Option 2: Separate Hosting

### Backend: Railway/Render/Heroku

1. **Railway**: Connect your GitHub repo, select backend folder
2. **Render**: Create a new Web Service, connect repo, set build command: `pip install -r requirements.txt`, start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Heroku**: Create app, add Procfile, deploy via Git

### Frontend: Vercel/Netlify

1. **Vercel**: Connect GitHub repo, select frontend folder, deploy
2. **Netlify**: Connect repo, set build command: `cd frontend && npm run build`, publish directory: `frontend/dist`

## Option 3: Docker Deployment

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PORT=8000
  
  frontend:
    build: ./frontend
    ports:
      - "8080:80"
    depends_on:
      - backend
```

## Environment Variables

Set these in your hosting platform:

- `PORT`: Port number (usually set automatically)
- `NODE_ENV`: Set to `production` for frontend

## Security Notes

- Change CORS origins from `["*"]` to your actual domain
- Add authentication if deploying publicly
- Consider rate limiting for the API
- Add input validation for commands

## Build Commands

- Backend: `pip install -r requirements.txt`
- Frontend: `npm install && npm run build`

## Quick Deploy to Railway

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`

That's it! Your terminal should be live.
