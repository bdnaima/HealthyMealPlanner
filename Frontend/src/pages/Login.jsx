import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);

      navigate("/recipes");
      window.location.reload();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="auth-page">
      {" "}
      <div className="auth-card">
        {" "}
        <div className="auth-header">
          {" "}
          <span className="auth-icon">🥗</span>
          <h1>Welcome Back</h1>
          <p>Log in to continue planning delicious and healthy meals.</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          {message && <p className="auth-success">{message}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Login;
