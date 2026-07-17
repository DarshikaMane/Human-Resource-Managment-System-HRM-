from pydantic import BaseModel
from datetime import datetime, date


# -------------------- Department --------------------

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


# -------------------- Employee --------------------

class EmployeeCreate(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    email: str
    mobile: str
    department: str
    role: str
    reporting_manager: str
    date_of_joining: date


class EmployeeResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    password: str
    email: str
    mobile: str
    department: str
    role: str
    reporting_manager: str
    date_of_joining: date
    created_at: datetime
    updated_at: datetime
    status: bool

    class Config:
        from_attributes = True


# -------------------- User --------------------

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


# -------------------- Login --------------------

class LoginRequest(BaseModel):
    username: str
    password: str