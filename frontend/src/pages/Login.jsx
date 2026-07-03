import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    console.log("1. Login button clicked");

    try {
      console.log("2. Before API");

      const response = await API.post("/login", {
        username,
        password,
      });

      console.log("3. API Success", response);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      console.log("4. Token Saved");

      navigate("/dashboard");

      console.log("5. Navigate");

    } catch (err) {
      console.log("LOGIN ERROR");
      console.log(err);
      console.log(err.response);
      console.log(err.response?.data);

      setError("Invalid username or password");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">

        <h2>HRM Login</h2>

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

        <button onClick={handleLogin}>
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;