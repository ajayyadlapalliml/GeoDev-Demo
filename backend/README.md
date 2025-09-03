# Geo Development Demo - Backend

FastAPI backend for managing real estate development projects and tasks. Built with modern Python practices and designed for scalability.

## Tech Stack

- **Framework**: FastAPI with automatic API documentation
- **ORM**: SQLAlchemy 2.0+ with async support
- **Validation**: Pydantic for request/response schemas
- **Database**: PostgreSQL (Supabase) with SQLite fallback
- **Server**: Uvicorn with hot reload for development

## Quick Setup

### Prerequisites
- Python 3.8+ (Python 3.13+ recommended)
- pip package manager
- Virtual environment (recommended)

### 1. Environment Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Configuration
```bash
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

### 3. Start the Server
```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Production mode
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 4. Verify Installation
- **API**: http://localhost:8000
- **Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

## API Endpoints

### Core Endpoints
- `GET /` - API information and version
- `GET /health` - Health check endpoint
- `GET /docs` - Interactive API documentation (Swagger UI)

### Projects Management
- `POST /projects` - Create a new development project
- `GET /projects` - List all projects
- `GET /projects/{id}` - Get project with associated tasks

### Task Management
- `POST /projects/{id}/tasks` - Create a task for a specific project
- `GET /projects/{id}/tasks` - List all tasks for a specific project

## Database

### Automatic Setup
- Tables are automatically created on startup
- SQLAlchemy handles all database operations
- Proper foreign key relationships with cascade delete

### Database Options

#### Option 1: Supabase PostgreSQL (Recommended)
- Production-ready PostgreSQL database
- Automatic backups and scaling
- Professional hosting solution

#### Option 2: SQLite (Demo/Fallback)
- Local file-based database
- No external dependencies
- Perfect for development and demos

### Schema
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

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI application and CORS setup
│   ├── db.py            # Database connection and session management
│   ├── models.py        # SQLAlchemy ORM models
│   ├── schemas.py       # Pydantic validation schemas
│   └── routers/         # API route handlers
│       ├── __init__.py
│       ├── projects.py  # Project CRUD operations
│       └── tasks.py     # Task CRUD operations
├── requirements.txt      # Python dependencies
├── .env                 # Environment variables (create this)
└── README.md           # This file
```

## Configuration

### Environment Variables
- `SUPABASE_DB_URL`: Supabase PostgreSQL connection string
- If not set, falls back to SQLite automatically

### CORS Settings
- Configured for local development
- Allows frontend on ports 5173 and 3000
- Easily adjustable for production domains

## Troubleshooting

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
pip install --upgrade pip
pip install -r requirements.txt

# Alternative: Use asyncpg if psycopg2 fails
pip install asyncpg
```

#### Virtual Environment Issues
```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Database Reset
```bash
# For SQLite
rm geodev_demo.db
# Restart the backend server

# For Supabase
# Tables are created automatically via SQLAlchemy
```

## Development

### Code Quality
- Type hints throughout the codebase
- Pydantic validation for all inputs
- Proper error handling with HTTP status codes
- Clean separation of concerns

### Adding New Features
1. Define models in `models.py`
2. Create schemas in `schemas.py`
3. Add routes in appropriate router files
4. Update this README with new endpoints

### Testing
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests (when implemented)
pytest
```

## Deployment

### Production Considerations
- Use production WSGI server (Gunicorn + Uvicorn workers)
- Set proper CORS origins for production domains
- Use environment variables for all configuration
- Consider database connection pooling for high traffic

### Docker Support
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Dependencies

### Core Dependencies
- `fastapi>=0.104.0` - Modern web framework
- `uvicorn[standard]>=0.24.0` - ASGI server
- `sqlalchemy>=2.0.0` - Database ORM
- `pydantic>=2.5.0` - Data validation
- `python-dotenv>=1.0.0` - Environment variable management

### Database Drivers
- `psycopg2-binary>=2.9.0` - PostgreSQL adapter
- `asyncpg>=0.29.0` - Async PostgreSQL driver

## Contributing

This is a demo project, but if you find any issues or have suggestions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

---

**Ready to build amazing real estate development workflows? Start the server and create your first project!**
