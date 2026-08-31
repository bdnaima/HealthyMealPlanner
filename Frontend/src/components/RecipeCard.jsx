import { Link } from "react-router-dom";
import { isAdmin } from "../services/auth";
import { deleteRecipe } from "../services/api";

import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const admin = isAdmin();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${recipe.recipeName}"?`,
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await deleteRecipe(recipe.recipeId, token);

      // Refresh the page so the deleted recipe disappears
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete recipe.");
    }
  }

  return (
    <article className="recipe-card">
      <div className="recipe-card-image">
        <span>🍽️</span>
      </div>

      <div className="recipe-card-content">
        <h2>{recipe.recipeName}</h2>

        <p>{recipe.description || "A delicious and healthy recipe."}</p>

        <div className="recipe-card-actions">
          <Link
            to={`/recipes/${recipe.recipeId}`}
            className="recipe-card-button"
          >
            View Recipe
          </Link>

          {admin && (
            <>
              <Link
                to={`/admin/recipes/edit/${recipe.recipeId}`}
                className="edit-recipe-button"
              >
                Edit
              </Link>

              <button
                type="button"
                className="delete-recipe-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;
