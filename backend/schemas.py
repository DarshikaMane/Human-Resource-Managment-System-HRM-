from pydantic import BaseModel
from datetime import datetime


class DepartmentCreate(BaseModel):
    department_name: str
    description: str


class DepartmentResponse(BaseModel):
    id: int
    department_name: str
    description: str
    created_at: datetime
    updated_at: datetime
    status: bool

    class Config:
        from_attributes = True

class EmployeeCreate(BaseModel):
    employee_name: str
    email: str
    phone: str
    department: str
    designation: str
    salary: int


class EmployeeResponse(BaseModel):
    id: int
    employee_name: str
    email: str
    phone: str
    department: str
    designation: str
    salary: int
    created_at: datetime
    updated_at: datetime
    status: bool

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    username: str
    password: str
    role: str


class UserResponse(BaseModel):
    id: int
    username: str
    password: str
    role: str

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    username: str
    password: str