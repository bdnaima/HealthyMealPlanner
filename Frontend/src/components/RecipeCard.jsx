import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-image">
        <span>🍽️</span>
      </div>

      <div className="recipe-card-content">
        <h2>{recipe.recipeName}</h2>

        <p>{recipe.description || "A delicious and healthy recipe."}</p>

        <Link to={`/recipes/${recipe.recipeId}`} className="recipe-card-button">
          View Recipe
        </Link>
      </div>
    </article>
  );
}

export default RecipeCard;
