import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

<ul>
  <li onClick={() => navigate("/dashboard")}>
    Dashboard
  </li>

  <li onClick={() => navigate("/dashboard/departments")}>
    Departments
  </li>

  <li onClick={() => navigate("/dashboard/employees")}>
    Employees
  </li>

  <li onClick={() => navigate("/dashboard/users")}>
    Users
  </li>
</ul>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;