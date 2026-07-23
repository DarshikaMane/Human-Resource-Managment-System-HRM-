import { useEffect, useState } from "react";
import API from "../services/api";
import "../css/Role.css";

import RoleForm from "./RoleForm";
import RoleTable from "./RoleTable";

function Role() {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await API.get("/roles/");
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/roles/${editingId}`, {
          role_name: roleName,
          description: description,
        });

        alert("Role Updated Successfully");
      } else {
        await API.post("/roles/", {
          role_name: roleName,
          description: description,
        });

        alert("Role Created Successfully");
      }

      setRoleName("");
      setDescription("");
      setEditingId(null);

      fetchRoles();

    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (role) => {
    setEditingId(role.role_id);
    setRoleName(role.role_name);
    setDescription(role.description);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) {
      return;
    }

    try {
      await API.delete(`/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="role-page">
      <h1 className="role-title">Role Management</h1>

      <RoleForm
        roleName={roleName}
        setRoleName={setRoleName}
        description={description}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
        editingId={editingId}
      />

      <RoleTable
        roles={roles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Role;