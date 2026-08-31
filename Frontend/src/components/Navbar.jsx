import { Link, useNavigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../services/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  const admin = isAdmin();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Healthy Meal Planner
        </Link>

        <div className="navbar-links">
          <Link to="/">Home</Link>

          <Link to="/recipes">Recipes</Link>

          {loggedIn && <Link to="/meal-planner">Meal Planner</Link>}

          {admin && (
            <Link to="/admin" className="navbar-admin">
              Admin Dashboard
            </Link>
          )}

          {!loggedIn ? (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>

              <Link to="/register" className="navbar-register">
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="navbar-logout">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
