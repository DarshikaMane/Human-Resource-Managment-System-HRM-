from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from department import router as department_router
from employee import router as employee_router
from users import router as user_router
from role import router as role_router
from database import engine
from models import Base
from auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home API
@app.get("/")
def home():
    return {"message": "Hello"}

# Department APIs
app.include_router(department_router)
#Employee APIs
app.include_router(employee_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(role_router)