from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserResponse
from security import verify_token

router = APIRouter()


# Get All Users
@router.get("/users", response_model=list[UserResponse])
def get_users(
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    return db.query(User).all()


# Add User
@router.post("/users", response_model=UserResponse)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    new_user = User(
        username=user.username,
        password=user.password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Update User
@router.put("/users/{user_id}")
def update_user(
    user_id: int,
    user: UserCreate,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User Not Found")

    existing_user.username = user.username
    existing_user.password = user.password
    existing_user.role = user.role

    db.commit()
    db.refresh(existing_user)

    return existing_user


# Delete User
@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not existing_user:
        raise HTTPException(status_code=404, detail="User Not Found")

    db.delete(existing_user)
    db.commit()

    return {"message": "User Deleted Successfully"}