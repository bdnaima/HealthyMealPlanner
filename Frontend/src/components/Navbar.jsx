import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🥗 Healthy Meal Planner
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/meal-planner">Meal Planner</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
