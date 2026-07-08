# Human Resource Management System (HRM)

A full-stack Human Resource Management System (HRM) developed using **React (Vite)**, **FastAPI**, and **MySQL**. This application helps organizations manage departments, employees, and users through a secure and user-friendly web interface.

---

## Live Demo

### Frontend (Vercel)

https://human-resource-managment-system-hrm.vercel.app

---
### Backend (Render)

https://hrm-backend-bb81.onrender.com

---

## GitHub Repository

https://github.com/DarshikaMane/Human-Resource-Managment-System-HRM-

---

# Features

- User Authentication (Login & Registration)
- Secure Logout
- Admin Dashboard
- Department Management
- Employee Management
- User Management
- Add, Edit, Delete Operations
- Search Functionality
- Real-time Data Updates
- REST API Integration
- Responsive User Interface

---

# Technology Stack

## Frontend

- React.js (Vite)
- React Router
- Axios
- CSS

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Database

- MySQL

## Deployment

- Vercel (Frontend)
- Render (Backend)

## Version Control

- Git
- GitHub

---

# Project Structure

```
Human-Resource-Management-System-HRM
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── routers
│   ├── models
│   ├── schemas
│   ├── database.py
│   └── main.py
│
├── README.md
└── .gitignore
```

---

# Modules

### Authentication

- Login
- Registration
- Logout

### Dashboard

- Department Count
- Employee Count
- User Count

### Department Module

- Add Department
- Update Department
- Delete Department
- Search Department

### Employee Module

- Add Employee
- Update Employee
- Delete Employee
- Search Employee

### User Module

- Add User
- Update User
- Delete User
- Search User

---

# Installation

## Clone Repository

```bash
git clone https://github.com/DarshikaMane/Human-Resource-Managment-System-HRM-.git
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# API

The frontend communicates with the FastAPI backend using REST APIs.

Example API:

```
POST /login
GET /departments
POST /departments
PUT /departments/{id}
DELETE /departments/{id}
```

---

# Future Enhancements

- Role Based Access Control
- Attendance Management
- Payroll Management
- Leave Management
- Email Notifications
- Report Generation

---

# Author

**Darshika Vilas Mane**

---

# License

This project was developed for educational and internship purposes.