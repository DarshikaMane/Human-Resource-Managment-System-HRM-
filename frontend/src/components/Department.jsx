import { useState, useEffect } from "react";
import API from "../services/api";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await API.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveDepartment = async () => {
    if (departmentName === "" || description === "") {
      alert("Please Fill All Fields");
      return;
    }

    try {
      if (editId !== null) {
        await API.put(`/departments/${editId}`, {
          department_name: departmentName,
          description: description,
        });

        fetchDepartments();
        setEditId(null);

      } else {
        await API.post("/departments", {
          department_name: departmentName,
          description: description,
        });

        fetchDepartments();
      }

      setDepartmentName("");
      setDescription("");

    } catch (error) {
      console.log(error);
      alert("Error saving department");
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await API.delete(`/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.log(error);
      alert("Error deleting department");
    }
  };

  return (
    <div>

      <div className="top-bar">

        <button className="add-btn">
          Add Department
        </button>

        <input
          type="text"
          placeholder="Search Department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

      </div>

      <div className="form-container">

        <input
          type="text"
          placeholder="Enter Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="save-btn"
          onClick={saveDepartment}
        >
          {editId !== null ? "Update Department" : "Save Department"}
        </button>

      </div>



      <table className="department-table">

        <thead>
          <tr>
            <th>Dept ID</th>
            <th>Department Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {departments
            .filter((dept) =>
              dept.department_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .map((dept, index) => (

              <tr key={dept.id}>

                <td>{index + 1}</td>

                <td>{dept.department_name}</td>

                <td>{dept.description}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setDepartmentName(dept.department_name);
                      setDescription(dept.description);
                      setEditId(dept.id);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to deactivate this department?"
                      );

                      if (confirmDelete) {
                        deleteDepartment(dept.id);
                      }
                    }}
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

export default Department;