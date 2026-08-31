import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipe } from "../services/api";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadRecipe();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!recipe) {
    return <p>Loading recipe...</p>;
  }

  return (
    <main>
      <Link to="/recipes">← Back to Recipes</Link>

      <h1>{recipe.recipeName}</h1>

      <p>{recipe.description}</p>

      <h2>Category</h2>

      <p>{recipe.category?.categoryName || "No category"}</p>
    </main>
  );
}

export default RecipeDetails;
