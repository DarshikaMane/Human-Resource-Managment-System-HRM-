import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await API.post("/users", {
        username,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Create Account</h2>

        {error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Admin</option>
          <option>User</option>
        </select>

        <button onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;