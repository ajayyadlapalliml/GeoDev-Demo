from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import projects, tasks
from .db import engine
from . import models

app = FastAPI(
    title="Geo Development Demo API",
    description="API for managing real estate development projects and tasks",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(projects.router)
app.include_router(tasks.router)

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    try:
        models.Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully")
    except Exception as e:
        print(f"⚠️  Warning: Could not create database tables: {e}")

@app.get("/")
def read_root():
    return {
        "message": "Geo Development Demo API",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}
