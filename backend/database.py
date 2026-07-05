import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql://root:apggVpJdxoXOhkbPFodCrJoiEJJqJpIY@hayabusa.proxy.rlwy.net:56031/railway"
)

# Convert Railway MySQL URL to SQLAlchemy format
DATABASE_URL = DATABASE_URL.replace(
    "mysql://",
    "mysql+pymysql://",
    1
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()