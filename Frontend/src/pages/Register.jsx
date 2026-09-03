import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import "./Login.css";

function Register() {
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
      await registerUser(email, password);

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
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
          <span className="auth-icon">🌱</span>
          <h1>Create an Account</h1>
          <p>Start planning your meals and make healthy eating easier.</p>
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
              placeholder="Create a password"
              required
            />
          </label>

          <p className="password-hint">
            Choose a secure password that you will remember.
          </p>

          {error && <p className="auth-error">{error}</p>}

          {message && <p className="auth-success">{message}</p>}

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
