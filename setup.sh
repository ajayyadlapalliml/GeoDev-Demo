#!/bin/bash

echo "🏗️ Setting up Geo Development Demo..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3.8+ and try again."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 16+ and try again."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Backend setup
echo "🔧 Setting up backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Setting up environment file..."
if [ ! -f ".env" ]; then
    cp env.example .env
    echo "⚠️  Please edit backend/.env with your SUPABASE_DB_URL"
fi

cd ..

# Frontend setup
echo "⚛️  Setting up frontend..."
cd frontend

echo "Installing Node.js dependencies..."
npm install

echo "Setting up environment file..."
if [ ! -f ".env" ]; then
    cp env.example .env
    echo "⚠️  Please edit frontend/.env with your backend API URL"
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your Supabase database URL"
echo "2. Edit frontend/.env with your backend API URL (default: http://localhost:8000)"
echo ""
echo "To run the application:"
echo "Backend:  cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
echo "Frontend: cd frontend && npm run dev"
echo ""
echo "Access the app at:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:8000"
echo "- API Docs: http://localhost:8000/docs"
