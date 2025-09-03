# 🚀 Quick Start Guide

Get your Geo Development Demo running in 5 minutes!

## ⚡ Super Quick Setup

### 1. Run the Setup Script
```bash
./setup.sh
```

### 2. Configure Environment Variables
```bash
# Backend - Edit backend/.env
SUPABASE_DB_URL=your_supabase_connection_string

# Frontend - Edit frontend/.env  
VITE_API_URL=http://localhost:8000
```

### 3. Start the Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

### 4. Start the Frontend (new terminal)
```bash
cd frontend
npm run dev
```

### 5. Open Your Browser
- Frontend: http://localhost:5173
- API Docs: http://localhost:8000/docs

## 🎯 Demo Flow

1. **Create a Project**: Click "Add Project" → Enter "Downtown Office Complex"
2. **Add Tasks**: Click the project → "Add Task" → Enter "Zoning Approval"
3. **Navigate**: Click between projects to show the workflow
4. **Showcase**: Demonstrate the full-stack capabilities!

## 🔧 What You'll See

- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Real-time Updates**: React Query for seamless data management
- **API Integration**: FastAPI backend with automatic documentation
- **Database**: Supabase Postgres with proper relationships

## 🆘 Need Help?

- Check the main README.md for detailed setup
- Verify your Supabase connection string
- Ensure ports 8000 and 5173 are available
- Run `./setup.sh` again if you encounter issues

Ready to impress! 🏗️✨
