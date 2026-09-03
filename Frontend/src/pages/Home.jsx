import { Link } from "react-router-dom";

import heroImg from "../assets/hero.jpg";

import { isAdmin, isLoggedIn } from "../services/auth";

import "./Home.css";

function Home() {
  const loggedIn = isLoggedIn();
  const admin = isAdmin();

  return (
    <main className="home">
      {" "}
      <section className="hero">
        {" "}
        <div className="hero-content">
          {" "}
          <span className="hero-badge">Healthy Meal Planner</span>
          <h1>Healthy eating, made simple.</h1>
          <p>
            Plan your meals, discover delicious recipes, and make healthy eating
            easier every day.
          </p>
          <div className="hero-buttons">
            <Link to="/recipes" className="hero-button hero-button-primary">
              Explore Recipes
            </Link>

            {loggedIn ? (
              <Link
                to="/meal-planner"
                className="hero-button hero-button-secondary"
              >
                Plan My Meals
              </Link>
            ) : (
              <Link to="/login" className="hero-button hero-button-secondary">
                Get Started
              </Link>
            )}
          </div>
          {admin && (
            <Link to="/admin" className="admin-home-link">
              Go to Admin Dashboard →
            </Link>
          )}
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Healthy meal" />
        </div>
      </section>
    </main>
  );
}

export default Home;
