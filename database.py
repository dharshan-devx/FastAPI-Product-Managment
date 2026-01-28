
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

db_url = os.getenv(
    "DATABASE_URL", os.getenv("RENDER_DATABASE_URL", "postgresql://postgres:Dharshan%4009@localhost:5432/products_db"))

try:
    engine = create_engine(db_url)
    # Test connection
    engine.connect().close()
except Exception as e:
    print(f"Warning: Database connection failed - {e}")
    print("Using SQLite as fallback...")
    db_url = "sqlite:///./products.db"
    engine = create_engine(db_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
