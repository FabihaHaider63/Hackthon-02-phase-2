from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from sqlmodel import Session, select
import jwt
import os
import datetime
from dotenv import load_dotenv

from serverless_db import get_session
from models import User
from security import get_password_hash, verify_password

load_dotenv()

router = APIRouter()

class AuthRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    token: str
    userId: str
    email: str

@router.post("/signup", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
async def signup(request: AuthRequest, session: Session = Depends(get_session)):
    if not request.email or not request.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email and password required"
        )
    
    # Check if user already exists
    statement = select(User).where(User.email == request.email)
    existing_user = session.exec(statement).first()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
        
    # Create new user
    hashed_pwd = get_password_hash(request.password)
    user = User(email=request.email, hashed_password=hashed_pwd)
    
    session.add(user)
    session.commit()
    session.refresh(user)
    
    # Generate token
    token = create_token(user.id)
    
    return AuthResponse(token=token, userId=user.id, email=user.email)

@router.post("/login", response_model=AuthResponse)
async def login(request: AuthRequest, session: Session = Depends(get_session)):
    if not request.email or not request.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Email and password required"
        )
    
    # Find user
    statement = select(User).where(User.email == request.email)
    user = session.exec(statement).first()
    
    if not user or not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    # Generate token
    token = create_token(user.id)
    
    return AuthResponse(token=token, userId=user.id, email=user.email)

def create_token(user_id: str) -> str:
    secret = os.getenv("BETTER_AUTH_SECRET")
    if not secret:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server misconfiguration: No secret key"
        )
    
    payload = {
        "userId": user_id,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    
    return jwt.encode(payload, secret, algorithm="HS256")
