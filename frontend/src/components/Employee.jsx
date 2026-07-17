import { useState, useEffect } from "react";
import API from "../services/api";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [reportingManager, setReportingManager] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");

  const [employeeEditId, setEmployeeEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setMobile("");
    setDepartment("");
    setRole("");
    setReportingManager("");
    setDateOfJoining("");
    setEmployeeEditId(null);
  };

  const saveEmployee = async () => {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !email ||
      !mobile ||
      !department ||
      !role ||
      !reportingManager ||
      !dateOfJoining
    ) {
      alert("Please fill all fields");
      return;
    }

    const employeeData = {
      first_name: firstName,
      last_name: lastName,
      username,
      password,
      email,
      mobile,
      department,
      role,
      reporting_manager: reportingManager,
      date_of_joining: dateOfJoining,
    };

    try {
      if (employeeEditId) {
        await API.put(`/employees/${employeeEditId}`, employeeData);
      } else {
        await API.post("/employees", employeeData);
      }

      fetchEmployees();
      clearForm();

    } catch (error) {
  console.log(error);
  console.log(error.response);

  alert(
    error.response?.data?.detail
      ? JSON.stringify(error.response.data.detail)
      : error.message
  );
}
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.log(error);
      alert("Error deleting employee");
    }
  };
  return (
    <div className="employee-section">

      <div className="top-bar">

        <button className="add-btn">
          Add Employee
        </button>

        <input
          type="text"
          placeholder="Search Employee..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

      </div>

      <div className="employee-form">

        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option>IT</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Sales</option>
        </select>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option>Admin</option>
          <option>Manager</option>
          <option>Employee</option>
        </select>

        <select
          value={reportingManager}
          onChange={(e) => setReportingManager(e.target.value)}
        >
          <option value="">Reporting Manager</option>
          <option>Manager 1</option>
          <option>Manager 2</option>
          <option>Manager 3</option>
        </select>

        <input
          type="date"
          value={dateOfJoining}
          onChange={(e) => setDateOfJoining(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="save-btn"
          onClick={saveEmployee}
        >
          {employeeEditId ? "Update Employee" : "Save Employee"}
        </button>

      </div>

      <table className="department-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Department</th>
            <th>Role</th>
            <th>Reporting Manager</th>
            <th>Date of Joining</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees
            .filter((emp) =>
              (emp.first_name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((emp, index) => (

              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.first_name}</td>
                <td>{emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.mobile}</td>
                <td>{emp.department}</td>
                <td>{emp.role}</td>
                <td>{emp.reporting_manager}</td>
                <td>{emp.date_of_joining}</td>
                <td>{emp.username}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setFirstName(emp.first_name);
                      setLastName(emp.last_name);
                      setUsername(emp.username);
                      setPassword(emp.password);
                      setEmail(emp.email);
                      setMobile(emp.mobile);
                      setDepartment(emp.department);
                      setRole(emp.role);
                      setReportingManager(emp.reporting_manager);
                      setDateOfJoining(emp.date_of_joining);
                      setEmployeeEditId(emp.id);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}

export default Employee;