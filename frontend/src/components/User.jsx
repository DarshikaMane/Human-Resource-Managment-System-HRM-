import { useState, useEffect } from "react";
import API from "../services/api";

function User() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async () => {
    if (username === "" || password === "" || role === "") {
      alert("Please Fill All Fields");
      return;
    }

    try {
      if (editId !== null) {
        await API.put(`/users/${editId}`, {
          username,
          password,
          role,
        });

        setEditId(null);
      } else {
        await API.post("/users", {
          username,
          password,
          role,
        });
      }

      fetchUsers();

      setUsername("");
      setPassword("");
      setRole("");

    } catch (error) {
      console.log(error);
      alert("Error saving user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log(error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="employee-section">

      <button className="add-btn">
        Add User
      </button>

      <div className="employee-form">

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <button
          className="save-btn"
          onClick={saveUser}
        >
          {editId !== null ? "Update User" : "Save User"}
        </button>

      </div>

      <table className="department-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {users.map((user, index) => (

            <tr key={user.id}>

              <td>{index + 1}</td>

              <td>{user.username}</td>

              <td>{user.role}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => {
                    setUsername(user.username);
                    setPassword(user.password);
                    setRole(user.role);
                    setEditId(user.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
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

export default User;