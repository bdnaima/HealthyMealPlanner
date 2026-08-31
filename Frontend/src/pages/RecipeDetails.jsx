import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getRecipe,
  createPlannedMeal,
  getFoods,
  createRecipeIngredient,
  deleteRecipeIngredient,
} from "../services/api";
import { isAdmin } from "../services/auth";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [mealDate, setMealDate] = useState("");
  const [message, setMessage] = useState("");
  const [foods, setFoods] = useState([]);
  const [showIngredientForm, setShowIngredientForm] = useState(false);

  const [ingredient, setIngredient] = useState({
    foodId: "",
    quantity: "",
    unit: "",
  });

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

  // Load foods for ingredient selection
  useEffect(() => {
    if (!isAdmin()) {
      return;
    }

    async function loadFoods() {
      try {
        const token = localStorage.getItem("token");

        const data = await getFoods(token);

        setFoods(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadFoods();
  }, []);

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

  // Handle adding a new ingredient
  async function handleAddIngredient(event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const newIngredient = await createRecipeIngredient(
        {
          recipeId: recipe.recipeId,
          foodId: Number(ingredient.foodId),
          quantity: ingredient.quantity ? Number(ingredient.quantity) : null,
          unit: ingredient.unit || null,
        },
        token,
      );

      setRecipe((currentRecipe) => ({
        ...currentRecipe,
        ingredients: [...(currentRecipe.ingredients || []), newIngredient],
      }));

      setIngredient({
        foodId: "",
        quantity: "",
        unit: "",
      });

      setShowIngredientForm(false);
      setMessage("Ingredient added successfully!");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  // Handle deleting an ingredient
  async function handleDeleteIngredient(ingredientId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ingredient?",
    );

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      await deleteRecipeIngredient(ingredientId, token);

      setRecipe((currentRecipe) => ({
        ...currentRecipe,
        ingredients: currentRecipe.ingredients.filter(
          (item) => item.recipeIngredientId !== ingredientId,
        ),
      }));

      setMessage("Ingredient deleted.");
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
            <div className="ingredients-header">
              <h2>Ingredients</h2>

              {isAdmin() && (
                <button
                  className="add-ingredient-button"
                  onClick={() => setShowIngredientForm(!showIngredientForm)}
                >
                  + Add Ingredient
                </button>
              )}
            </div>

            <ul className="ingredients-list">
              {recipe.ingredients?.map((ingredient) => (
                <li key={ingredient.recipeIngredientId}>
                  <div className="ingredient-info">
                    <span>{ingredient.food?.foodName}</span>

                    <span>
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>

                  {isAdmin() && (
                    <button
                      className="delete-ingredient-button"
                      onClick={() =>
                        handleDeleteIngredient(ingredient.recipeIngredientId)
                      }
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {isAdmin() && showIngredientForm && (
              <form className="ingredient-form" onSubmit={handleAddIngredient}>
                <h3>Add Ingredient</h3>

                <label>
                  Food
                  <select
                    value={ingredient.foodId}
                    onChange={(event) =>
                      setIngredient({
                        ...ingredient,
                        foodId: event.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select a food</option>

                    {foods.map((food) => (
                      <option key={food.foodId} value={food.foodId}>
                        {food.foodName}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Quantity
                  <input
                    type="number"
                    step="0.01"
                    value={ingredient.quantity}
                    onChange={(event) =>
                      setIngredient({
                        ...ingredient,
                        quantity: event.target.value,
                      })
                    }
                  />
                </label>

                <label>
                  Unit
                  <input
                    type="text"
                    placeholder="g, ml, tbsp..."
                    value={ingredient.unit}
                    onChange={(event) =>
                      setIngredient({
                        ...ingredient,
                        unit: event.target.value,
                      })
                    }
                  />
                </label>

                <div className="ingredient-form-actions">
                  <button type="submit" className="save-ingredient-button">
                    Add Ingredient
                  </button>

                  <button
                    type="button"
                    className="cancel-ingredient-button"
                    onClick={() => setShowIngredientForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
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
