from sqlmodel import create_engine, Session
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

def get_engine():
    """Create and return a database engine - only when called"""
    DATABASE_URL = os.getenv("DATABASE_URL")
    if DATABASE_URL is None:
        raise ValueError("DATABASE_URL is not set in environment!")
    
    # SQLite requires check_same_thread=False for multi-threaded usage (like FastAPI)
    connect_args = {"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
    
    return create_engine(DATABASE_URL, echo=True, connect_args=connect_args)

def get_session():
    """Get a database session"""
    engine = get_engine()
    with Session(engine) as session:
        yield session