from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Get database URL from environment variable
DATABASE_URL = os.getenv("SUPABASE_DB_URL")

if DATABASE_URL:
    print("🏗️  Attempting to connect to Supabase PostgreSQL...")
    try:
        # Test the connection by creating an engine
        test_engine = create_engine(DATABASE_URL)
        # Try to connect
        with test_engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Successfully connected to Supabase PostgreSQL!")
        
        # Use the Supabase connection
        engine = create_engine(DATABASE_URL)
        
    except Exception as e:
        print(f"❌ Failed to connect to Supabase: {e}")
        print("🔄 Falling back to SQLite for demo purposes")
        DATABASE_URL = "sqlite:///./geodev_demo.db"
        engine = create_engine(
            DATABASE_URL,
            connect_args={"check_same_thread": False}
        )
else:
    # No environment variable, use SQLite
    DATABASE_URL = "sqlite:///./geodev_demo.db"
    print("🏗️  No SUPABASE_DB_URL found, using SQLite for demo purposes")
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base class for models
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
