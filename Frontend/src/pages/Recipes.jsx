import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import "./Recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

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
