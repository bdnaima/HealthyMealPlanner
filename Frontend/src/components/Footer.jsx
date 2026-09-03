import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-content">
        <div>
          <h3>Healthy Meal Planner</h3>
          <p>Making healthy meal planning simple and enjoyable.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/meal-planner">Meal Planner</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Healthy Meal Planner. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
