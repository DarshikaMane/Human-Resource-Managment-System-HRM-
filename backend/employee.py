from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models import Employee
from backend.schemas import EmployeeCreate, EmployeeResponse
from backend.security import verify_token

router = APIRouter()


# Get All Employees
@router.get("/employees", response_model=list[EmployeeResponse])
def get_employees(
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    return db.query(Employee).all()


# Add Employee
@router.post("/employees", response_model=EmployeeResponse)
def create_employee(
    employee: EmployeeCreate,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    new_employee = Employee(
        employee_name=employee.employee_name,
        email=employee.email,
        phone=employee.phone,
        department=employee.department,
        designation=employee.designation,
        salary=employee.salary
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


# Update Employee
@router.put("/employees/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    employee: EmployeeCreate,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    emp = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not emp:
        raise HTTPException(
            status_code=404,
            detail="Employee Not Found"
        )

    emp.employee_name = employee.employee_name
    emp.email = employee.email
    emp.phone = employee.phone
    emp.department = employee.department
    emp.designation = employee.designation
    emp.salary = employee.salary

    db.commit()
    db.refresh(emp)

    return emp


# Delete Employee
@router.delete("/employees/{employee_id}")
def delete_employee(
    employee_id: int,
    username: str = Depends(verify_token),
    db: Session = Depends(get_db)
):

    emp = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if not emp:
        raise HTTPException(
            status_code=404,
            detail="Employee Not Found"
        )

    db.delete(emp)
    db.commit()

    return {"message": "Employee Deleted Successfully"}