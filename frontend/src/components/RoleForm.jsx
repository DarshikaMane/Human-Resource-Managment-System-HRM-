import React from "react";

function RoleForm({
  roleName,
  setRoleName,
  description,
  setDescription,
  handleSubmit,
  editingId,
}) {
  return (
    <div className="role-card">

      <h3>
        {editingId ? "Role Update" : "Role Creation"}
      </h3>

      <form onSubmit={handleSubmit}>

        <label>Role Name</label>

        <input
          type="text"
          placeholder="Enter Role Name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />

        <label>Role Description</label>

        <textarea
          rows="4"
          placeholder="Enter Role Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">
          {editingId ? "Update Role" : "Create Role"}
        </button>

      </form>

    </div>
  );
}

export default RoleForm;