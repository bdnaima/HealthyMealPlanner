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

            {!admin &&
              (loggedIn ? (
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
              ))}
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
      <section className="testimonials">
        <div className="section-heading">
          <span className="section-badge">What users say</span>
          <h2>Healthy eating made easier</h2>
          <p>Simple tools to help you plan meals and discover new recipes.</p>
        </div>

        <div className="testimonial-grid">
          <article className="testimonial-card">
            <p>
              "I love having all my meals planned for the week in one place."
            </p>
            <span>— Sarah</span>
          </article>

          <article className="testimonial-card">
            <p>
              "The recipes make it much easier to stay organized and eat
              healthy."
            </p>
            <span>— Emma</span>
          </article>

          <article className="testimonial-card">
            <p>
              "Planning my meals has become much simpler and less stressful."
            </p>
            <span>— Daniel</span>
          </article>
        </div>
      </section>
      <section className="newsletter">
        <div className="newsletter-content">
          <span className="section-badge">Stay inspired</span>
          <h2>Get healthy recipes in your inbox</h2>
          <p>
            Sign up for our newsletter and get new recipe ideas and healthy meal
            inspiration.
          </p>

          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thank you for subscribing!");
            }}
          >
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Home;
