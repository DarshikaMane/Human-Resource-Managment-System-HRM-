from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.department import router as department_router
from backend.employee import router as employee_router
from backend.users import router as user_router
from backend.database import engine
from backend.models import Base
from backend.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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