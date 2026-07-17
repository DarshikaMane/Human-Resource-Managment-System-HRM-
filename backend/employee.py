from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Employee
from schemas import EmployeeCreate, EmployeeResponse
from security import verify_token

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
        first_name=employee.first_name,
        last_name=employee.last_name,
        username=employee.username,
        password=employee.password,
        email=employee.email,
        mobile=employee.mobile,
        department=employee.department,
        role=employee.role,
        reporting_manager=employee.reporting_manager,
        date_of_joining=employee.date_of_joining
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
    emp = db.query(Employee).filter(Employee.id == employee_id).first()

    if not emp:
        raise HTTPException(
            status_code=404,
            detail="Employee Not Found"
        )

    emp.first_name = employee.first_name
    emp.last_name = employee.last_name
    emp.username = employee.username
    emp.password = employee.password
    emp.email = employee.email
    emp.mobile = employee.mobile
    emp.department = employee.department
    emp.role = employee.role
    emp.reporting_manager = employee.reporting_manager
    emp.date_of_joining = employee.date_of_joining

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
    emp = db.query(Employee).filter(Employee.id == employee_id).first()

    if not emp:
        raise HTTPException(
            status_code=404,
            detail="Employee Not Found"
        )

    db.delete(emp)
    db.commit()

    return {"message": "Employee Deleted Successfully"}