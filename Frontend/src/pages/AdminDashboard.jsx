import { Link, Navigate } from "react-router-dom";
import { isAdmin } from "../services/auth";
import "./AdminDashboard.css";

function AdminDashboard() {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <header className="admin-dashboard-header">
          <span className="admin-badge">Admin</span>

          <h1>Admin Dashboard</h1>

          <p>
            Manage recipes, ingredients and foods for the Healthy Meal Planner.
          </p>
        </header>

        <section className="admin-dashboard-grid">
          <div className="admin-card">
            <div className="admin-card-icon">🍽️</div>

            <h2>Manage Recipes</h2>

            <p>Create, edit and delete recipes.</p>

            <Link to="/recipes" className="admin-card-button">
              Manage Recipes
            </Link>
          </div>

          <div className="admin-card">
            <div className="admin-card-icon">🥕</div>

            <h2>Manage Foods</h2>

            <p>Add, edit and remove food ingredients.</p>

            <Link to="/admin/foods" className="admin-card-button">
              Manage Foods
            </Link>
          </div>

          <div className="admin-card">
            <div className="admin-card-icon">🧂</div>

            <h2>Manage Ingredients</h2>

            <p>Manage ingredients used in recipes.</p>

            <Link to="/admin/ingredients" className="admin-card-button">
              Manage Ingredients
            </Link>
          </div>

          <div className="admin-card">
            <div className="admin-card-icon">📂</div>

            <h2>Manage Categories</h2>

            <p>Manage categories used to organize recipes.</p>

            <Link to="/admin/categories" className="admin-card-button">
              Manage Categories
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
