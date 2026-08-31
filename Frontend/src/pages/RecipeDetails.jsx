import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipe, createPlannedMeal } from "../services/api";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [mealDate, setMealDate] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the recipe details when the component mounts
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

  // Handle adding the recipe to the meal plan
  async function handleAddToMealPlan() {
    if (!mealDate) {
      setError("Please choose a date.");
      return;
    }

    console.log("Recipe ID:", recipe.recipeId);
    console.log("Meal date:", mealDate);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to add meals to your plan.");
      return;
    }

    try {
      await createPlannedMeal(recipe.recipeId, mealDate, token);

      setMessage("Recipe added to your meal plan!");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="recipe-details-page">
      <div className="recipe-details-container">
        <Link to="/recipes" className="back-link">
          ← Back to Recipes
        </Link>

        <article className="recipe-details-card">
          <h1>{recipe.recipeName}</h1>

          <p className="recipe-description">{recipe.description}</p>

          <span className="recipe-category">
            {recipe.category?.categoryName || "No category"}
          </span>

          <section className="recipe-details-section">
            <h2>Ingredients</h2>

            <ul className="ingredients-list">
              {recipe.ingredients?.map((ingredient) => (
                <li key={ingredient.recipeIngredientId}>
                  <span>{ingredient.food.foodName}</span>

                  <span>
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="recipe-details-section">
            <h2>Instructions</h2>

            <p className="recipe-instructions">
              {recipe.instructions || "No instructions available."}
            </p>
          </section>

          <section className="add-to-plan">
            <h2>Add to Meal Plan</h2>

            <div className="meal-plan-form">
              <input
                type="date"
                value={mealDate}
                onChange={(event) => setMealDate(event.target.value)}
              />

              <button onClick={handleAddToMealPlan}>Add to Meal Plan</button>
            </div>

            {message && <p className="success-message">{message}</p>}

            {error && <p className="error-message">{error}</p>}
          </section>
        </article>
      </div>
    </main>
  );
}

export default RecipeDetails;
