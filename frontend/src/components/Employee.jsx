import { useState, useEffect } from "react";
import API from "../services/api";

function Employee() {
  const [employees, setEmployees] = useState([]);

  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

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

  const saveEmployee = async () => {
    if (
      employeeName === "" ||
      email === "" ||
      phone === "" ||
      department === "" ||
      designation === "" ||
      salary === ""
    ) {
      alert("Please Fill All Employee Fields");
      return;
    }

    try {
      if (employeeEditId !== null) {
        await API.put(`/employees/${employeeEditId}`, {
          employee_name: employeeName,
          email,
          phone,
          department,
          designation,
          salary: parseInt(salary),
        });

        setEmployeeEditId(null);

      } else {
        await API.post("/employees", {
          employee_name: employeeName,
          email,
          phone,
          department,
          designation,
          salary: parseInt(salary),
        });
      }

      fetchEmployees();

      setEmployeeName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setDesignation("");
      setSalary("");

    } catch (error) {
      console.log(error);
      alert("Error Saving Employee");
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
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
                <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button
          className="save-btn"
          onClick={saveEmployee}
        >
          {employeeEditId !== null ? "Update Employee" : "Save Employee"}
        </button>

      </div>

      <table className="department-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees
            .filter((emp) =>
              emp.employee_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((emp, index) => (

              <tr key={emp.id}>

                <td>{index + 1}</td>

                <td>{emp.employee_name}</td>

                <td>{emp.email}</td>

                <td>{emp.phone}</td>
                                <td>{emp.department}</td>

                <td>{emp.designation}</td>

                <td>{emp.salary}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEmployeeName(emp.employee_name);
                      setEmail(emp.email);
                      setPhone(emp.phone);
                      setDepartment(emp.department);
                      setDesignation(emp.designation);
                      setSalary(emp.salary.toString());
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