# 🏗️ Geo Development Demo

A full-stack demo application showcasing real estate development workflow management - perfect for demonstrating software engineering skills at Geo Development.

## 🎯 Project Overview

This demo mirrors Geo's mission of optimizing real estate development workflows by providing a simplified system to manage:
- **Development Projects** (e.g., "Residential Complex Phase 1")
- **Project Tasks** (e.g., "Zoning Approval", "Foundation Work")

## 🏗️ Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS + React Query
- **Backend**: Python FastAPI + SQLAlchemy + Pydantic
- **Database**: Supabase PostgreSQL (with SQLite fallback for demo)
- **API**: RESTful JSON APIs with CORS enabled

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (Python 3.13+ recommended)
- **Node.js 18+** and npm
- **Git** for cloning the repository

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-github-repo-url>
cd GeoDev_Demo

# Run the setup script (macOS/Linux)
chmod +x setup.sh
./setup.sh

# Or manually run these commands:
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd backend
# Create .env file
echo "SUPABASE_DB_URL=your_supabase_connection_string" > .env
```

**For Supabase users:**
- Go to your Supabase project dashboard
- Navigate to Settings → Database
- Copy the connection string
- Replace `your_supabase_connection_string` with your actual connection string
- **Important**: If your password contains special characters like `@`, encode them (e.g., `@` becomes `%40`)

**For demo purposes (SQLite):**
- Leave the `.env` file empty or delete it
- The app will automatically fall back to SQLite

#### Frontend (.env)
```bash
cd frontend
# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env
```

### 3. Start the Application

#### Terminal 1 - Backend
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

#### Database Connection Issues
- **Supabase**: Verify your connection string and ensure your database is accessible
- **SQLite Fallback**: If Supabase fails, the app automatically uses SQLite
- **Password Encoding**: Remember to URL-encode special characters in your Supabase password

#### Python Dependencies
```bash
# If you get build errors with psycopg2 on Python 3.13+
cd backend
pip install --upgrade pip
pip install -r requirements.txt
```

#### Frontend Build Issues
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Database Setup

The application automatically creates tables on startup. If you need to reset:

```bash
# For SQLite
cd backend
rm geodev_demo.db
# Restart the backend server

# For Supabase
# Tables are created automatically via SQLAlchemy
```

## 📋 Features

### Projects Management
- Create new development projects with name and description
- View all projects in a clean, responsive table
- Project details with creation timestamps

### Task Management
- Add tasks to specific projects with title and notes
- View all tasks for a project with status indicators
- Task details with creation timestamps

### User Experience
- Modern, responsive UI with Tailwind CSS
- Real-time data updates with React Query
- Clean navigation between projects and tasks
- Professional styling relevant to real estate development

## 🔧 API Endpoints

### Core Endpoints
- `GET /` - API information and version
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)

### Projects
- `POST /projects` - Create a new project
- `GET /projects` - List all projects
- `GET /projects/{id}` - Get project with associated tasks

### Tasks
- `POST /projects/{id}/tasks` - Create a task for a specific project
- `GET /projects/{id}/tasks` - List all tasks for a specific project

## 🗄️ Database Schema

```sql
-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎨 UI Components

- **ProjectForm**: Create new development projects with validation
- **ProjectTable**: Display all projects in a professional, sortable table
- **TaskForm**: Add tasks to projects with title and notes
- **TaskList**: Show project tasks with clean, organized layout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🔒 Security & Configuration

- CORS enabled for local development
- Environment variable configuration for sensitive data
- Input validation with Pydantic schemas
- SQL injection protection with SQLAlchemy ORM
- Automatic database table creation with proper relationships

## 📱 Demo Flow

1. **Create a Project**: Add a new development project (e.g., "Downtown Office Complex", "Residential Phase 2")
2. **Add Tasks**: Create tasks like "Site Survey", "Permit Application", "Foundation Design", "Electrical Planning"
3. **Navigate**: Click between projects to manage different development workflows
4. **Showcase**: Demonstrate full-stack CRUD operations, API design, and modern UI patterns

## 🎯 Why This Demo?

- **Relevant to Geo**: Real estate development workflow management
- **Full-Stack Skills**: Frontend, backend, database, and API design
- **Modern Tech Stack**: Industry-standard tools and best practices
- **Scalable Architecture**: Clean separation of concerns and maintainable code
- **Professional UI**: Polished interface that demonstrates attention to detail
- **Production Ready**: Proper error handling, validation, and fallback mechanisms

## 🚀 Deployment Ready

The application is structured for easy deployment:
- **Backend**: Can be deployed to any Python hosting service (Heroku, Railway, DigitalOcean, etc.)
- **Frontend**: Builds to static files for CDN deployment (Vercel, Netlify, AWS S3, etc.)
- **Database**: Connection configurable via environment variables
- **CORS**: Settings easily adjustable for production domains

### Build Commands
```bash
# Frontend build
cd frontend
npm run build

# Backend production
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📚 Learning Outcomes

This demo showcases:
- **API Design**: RESTful principles and endpoint organization
- **Database Modeling**: Relationships, constraints, and ORM usage
- **Frontend Development**: Modern React patterns, state management, and UI/UX
- **Backend Development**: FastAPI, dependency injection, and error handling
- **Full-Stack Integration**: Seamless communication between frontend and backend
- **Development Workflow**: Environment setup, dependency management, and debugging

## 🤝 Contributing

This is a demo project, but if you find any issues or have suggestions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

---

Perfect for demonstrating software engineering capabilities in a real estate development context! 🏗️✨

**Ready to showcase your skills? Start the application and create your first development project!**
