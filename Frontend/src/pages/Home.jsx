import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import "./Home.css";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Healthy eating, made simple.</h1>

          <p>
            Plan your meals, discover delicious recipes, and make healthy eating
            easier every day.
          </p>

          <div className="hero-buttons">
            <Link to="/recipes" className="hero-button hero-button-primary">
              Explore Recipes
            </Link>

            <Link
              to="/meal-planner"
              className="hero-button hero-button-secondary"
            >
              Plan My Meals
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Healthy meal" />
        </div>
      </section>
    </main>
  );
}

export default Home;
