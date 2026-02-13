import sys
import os

# Add the parent directory to sys.path to allow imports if running from root
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Todo Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Todo Backend API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/agent")
def agent_endpoint():
    return {"status": "success", "message": "Agent endpoint is reachable"}

# Import and include the task routes
from routes import tasks
from routes import auth

app.include_router(tasks.router, prefix="/api")
app.include_router(auth.router, prefix="/api/auth")