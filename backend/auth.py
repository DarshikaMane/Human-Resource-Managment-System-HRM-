from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import LoginRequest
from security import create_access_token

router = APIRouter()


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.username == data.username
    ).first()

    if not user or user.password != data.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        {"sub": user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }