import "./App.css";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import DashboardHome from "./pages/DashboardHome";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";

import { Outlet } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";

function DashboardLayout() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route index element={<DashboardHome />} />
        <Route path="departments" element={<Departments />} />
        <Route path="employees" element={<Employees />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;