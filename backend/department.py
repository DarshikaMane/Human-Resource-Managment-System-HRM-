from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Department
from schemas import DepartmentCreate, DepartmentResponse
from security import verify_token

router = APIRouter()


# Get All Departments
@router.get("/departments", response_model=list[DepartmentResponse])
def get_departments(
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    return db.query(Department).filter(
    Department.status == True
).all()


# Add Department
@router.post("/departments", response_model=DepartmentResponse)
def create_department(
    department: DepartmentCreate,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    new_department = Department(
        department_name=department.department_name,
        description=department.description
    )

    db.add(new_department)
    db.commit()
    db.refresh(new_department)

    return new_department


# Update Department
@router.put("/departments/{department_id}")
def update_department(
    department_id: int,
    department: DepartmentCreate,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    dept = db.query(Department).filter(
        Department.id == department_id
    ).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department Not Found")

    dept.department_name = department.department_name
    dept.description = department.description

    db.commit()
    db.refresh(dept)

    return dept


# Delete Department
@router.delete("/departments/{department_id}")
def delete_department(
    department_id: int,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    dept = db.query(Department).filter(
        Department.id == department_id
    ).first()

    if not dept:
        raise HTTPException(status_code=404, detail="Department Not Found")

    dept.status = False

    db.commit()
    db.refresh(dept)

    return {"message": "Department Deleted Successfully"}