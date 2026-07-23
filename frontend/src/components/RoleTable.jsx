import React from "react";

function RoleTable({ roles, onEdit, onDelete }) {
  return (
    <div className="role-dashboard">

      <h3>Roles Dashboard</h3>

      <table className="role-table">

        <thead>
          <tr>
            <th>Sr No</th>
            <th>Role Name</th>
            <th>Role Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>

          {roles.length === 0 ? (
            <tr>
              <td colSpan="5">No Roles Found</td>
            </tr>
          ) : (
            roles.map((role, index) => (
              <tr key={role.role_id}>

                <td>{index + 1}</td>

                <td>{role.role_name}</td>

                <td>{role.description}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(role)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(role.role_id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default RoleTable;