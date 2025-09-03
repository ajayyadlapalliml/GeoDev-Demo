# 🚀 Deployment Guide

This guide covers deploying the Geo Development Demo to various platforms and environments.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Working application locally
- ✅ Git repository set up
- ✅ Environment variables configured
- ✅ Database connection established

## 🌐 Frontend Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build and Deploy**
   ```bash
   cd frontend
   npm run build
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add `VITE_API_URL` with your backend URL

### Netlify

1. **Build the Project**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy Options**
   - **Drag & Drop**: Upload `dist` folder to Netlify
   - **Git Integration**: Connect your GitHub repository
   - **CLI**: Use `netlify-cli`

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_URL`

### GitHub Pages

1. **Update package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

2. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build and Upload**
   ```bash
   cd frontend
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

2. **Configure CloudFront**
   - Set origin to S3 bucket
   - Configure custom domain
   - Set up SSL certificate

## 🐍 Backend Deployment

### Railway

1. **Connect Repository**
   - Go to [Railway](https://railway.app/)
   - Connect your GitHub repository
   - Select the backend directory

2. **Environment Variables**
   - Add `SUPABASE_DB_URL` in Railway dashboard
   - Set `PORT` if needed

3. **Deploy**
   - Railway automatically deploys on push
   - Get your backend URL from dashboard

### Heroku

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # Download from Heroku website
   ```

2. **Create App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set SUPABASE_DB_URL="your_connection_string"
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Select backend directory

2. **Configure**
   - Set build command: `pip install -r requirements.txt`
   - Set run command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**
   - Add `SUPABASE_DB_URL` in the dashboard

### Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM python:3.11-slim
   
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   
   COPY . .
   EXPOSE 8000
   
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Build and Run**
   ```bash
   docker build -t geodev-backend .
   docker run -p 8000:8000 -e SUPABASE_DB_URL="your_url" geodev-backend
   ```

## 🗄️ Database Deployment

### Supabase (Recommended)

1. **Create Project**
   - Go to [Supabase](https://supabase.com/)
   - Create new project
   - Wait for setup to complete

2. **Get Connection String**
   - Go to Settings → Database
   - Copy connection string
   - Update password if needed

3. **Environment Variable**
   - Set `SUPABASE_DB_URL` in your deployment platform

### Alternative: Railway PostgreSQL

1. **Create Database**
   - Go to Railway dashboard
   - Add PostgreSQL service
   - Copy connection string

2. **Update Environment**
   - Set `SUPABASE_DB_URL` to Railway PostgreSQL URL

## 🔧 Production Configuration

### CORS Settings

Update `backend/app/main.py` for production:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-domain.com",
        "https://www.your-frontend-domain.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Environment Variables

**Backend (.env)**
```bash
SUPABASE_DB_URL=your_production_database_url
ENVIRONMENT=production
LOG_LEVEL=info
```

**Frontend (.env)**
```bash
VITE_API_URL=https://your-backend-domain.com
VITE_ENVIRONMENT=production
```

### Security Considerations

1. **HTTPS Only**
   - Ensure all URLs use HTTPS
   - Set up SSL certificates

2. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific secret management

3. **CORS**
   - Restrict origins to your domains
   - Remove wildcard origins in production

## 📱 Mobile Deployment

### React Native (Future Enhancement)

1. **Install React Native**
   ```bash
   npx react-native init GeoDevMobile
   ```

2. **Port Components**
   - Copy relevant components from frontend
   - Adapt for mobile UI patterns

3. **API Integration**
   - Use same backend API
   - Update base URL for production

## 🔍 Monitoring & Analytics

### Backend Monitoring

1. **Health Checks**
   - Use `/health` endpoint
   - Set up uptime monitoring

2. **Logging**
   - Implement structured logging
   - Use services like Logtail or Papertrail

3. **Performance**
   - Monitor response times
   - Set up alerts for slow queries

### Frontend Analytics

1. **Error Tracking**
   - Implement error boundaries
   - Use services like Sentry

2. **Performance**
   - Monitor Core Web Vitals
   - Use Lighthouse CI

## 🚨 Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check Node.js/Python versions
   - Verify all dependencies are in requirements.txt/package.json

2. **Environment Variables**
   - Ensure all required variables are set
   - Check for typos in variable names

3. **Database Connection**
   - Verify connection string format
   - Check firewall/network access

4. **CORS Errors**
   - Update CORS origins in backend
   - Check frontend API URL configuration

### Getting Help

1. **Check Logs**
   - Backend: Check deployment platform logs
   - Frontend: Check browser console

2. **Verify Configuration**
   - Environment variables
   - Database connection
   - API endpoints

3. **Test Locally**
   - Ensure everything works locally first
   - Use production environment variables locally

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Railway Documentation](https://docs.railway.app/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Supabase Documentation](https://supabase.com/docs)

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀✨
