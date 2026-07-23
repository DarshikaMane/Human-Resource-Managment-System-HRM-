from sqlalchemy import Column, Integer, String, DateTime, Boolean, Date
from datetime import datetime
from sqlalchemy.orm import declarative_base

Base = declarative_base()


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    department_name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    status = Column(Boolean, default=True)
    

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String(100), nullable=False)

    last_name = Column(String(100), nullable=False)

    username = Column(String(100), unique=True, nullable=False)

    password = Column(String(100), nullable=False)

    email = Column(String(100), nullable=False)

    mobile = Column(String(20), nullable=False)

    department = Column(String(100), nullable=False)

    role = Column(String(100), nullable=False)

    reporting_manager = Column(String(100), nullable=False)

    date_of_joining = Column(Date, nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    status = Column(Boolean, default=True)
    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    role = Column(String(50), nullable=False)

class Role(Base):
    __tablename__ = "roles"

    role_id = Column(Integer, primary_key=True, index=True)

    role_name = Column(String(100), nullable=False)

    description = Column(String(200), nullable=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )