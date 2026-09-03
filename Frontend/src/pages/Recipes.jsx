import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";
import { isAdmin } from "../services/auth";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import "./Recipes.css";
import "../index.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const admin = isAdmin();

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadRecipes();
  }, []);

  return (
    <main className="recipes-page">
      <header className="recipes-page-header">
        <h1>Recipes</h1>
        <p>Discover delicious and healthy recipes.</p>
      </header>

      {admin && (
        <Link to="/admin/recipes/create" className="create-recipe-link">
          + Add Recipe
        </Link>
      )}

      {error && <p>{error}</p>}

      {recipes.length === 0 && !error && <p>No recipes found.</p>}

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipeId} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}

export default Recipes;
