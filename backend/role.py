from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from models import Role
from schemas import RoleCreate, RoleResponse

router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Create Role
@router.post("/", response_model=RoleResponse)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    new_role = Role(
        role_name=role.role_name,
        description=role.description
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


# Get All Roles
@router.get("/", response_model=list[RoleResponse])
def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()


# Get Role By ID
@router.get("/{role_id}", response_model=RoleResponse)
def get_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.role_id == role_id).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    return role


# Update Role
@router.put("/{role_id}", response_model=RoleResponse)
def update_role(role_id: int, updated_role: RoleCreate, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.role_id == role_id).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    role.role_name = updated_role.role_name
    role.description = updated_role.description

    db.commit()
    db.refresh(role)

    return role


# Delete Role
@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.role_id == role_id).first()

    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    db.delete(role)
    db.commit()

    return {"message": "Role deleted successfully"}