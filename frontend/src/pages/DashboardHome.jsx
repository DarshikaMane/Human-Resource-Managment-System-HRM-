import { useState, useEffect } from "react";
import API from "../services/api";

function DashboardHome() {
  const [departmentCount, setDepartmentCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dept = await API.get("/departments");
      const emp = await API.get("/employees");
      const users = await API.get("/users");

      setDepartmentCount(dept.data.length);
      setEmployeeCount(emp.data.length);
      setUserCount(users.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>HRM Dashboard</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h3>Total Departments</h3>
          <h2>{departmentCount}</h2>
        </div>

        <div className="card">
          <h3>Total Employees</h3>
          <h2>{employeeCount}</h2>
        </div>

        <div className="card">
          <h3>Total Users</h3>
          <h2>{userCount}</h2>
        </div>

      </div>
    </>
  );
}

export default DashboardHome;