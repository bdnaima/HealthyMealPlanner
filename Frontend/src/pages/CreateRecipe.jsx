import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe, getCategories } from "../services/api";
import { isAdmin } from "../services/auth";
import "./CreateRecipe.css";

function CreateRecipe() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState([]);

  const [recipe, setRecipe] = useState({
    recipeName: "",
    categoryId: "",
    description: "",
    instructions: "",
    prepTime: "",
    calories: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/recipes");
      return;
    }

    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadCategories();
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setRecipe((currentRecipe) => ({
      ...currentRecipe,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createRecipe(
        {
          categoryId: Number(recipe.categoryId),
          recipeName: recipe.recipeName,
          description: recipe.description || null,
          instructions: recipe.instructions || null,
          prepTime: recipe.prepTime ? Number(recipe.prepTime) : null,
          calories: recipe.calories ? Number(recipe.calories) : null,
        },
        token,
      );

      navigate("/recipes");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="create-recipe-page">
      <div className="create-recipe-container">
        <h1>Create Recipe</h1>

        <p className="create-recipe-intro">
          Add a new healthy recipe to the collection.
        </p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Recipe Name
            <input
              type="text"
              name="recipeName"
              value={recipe.recipeName}
              onChange={handleChange}
              placeholder="e.g. Chicken Curry"
              required
            />
          </label>

          <label>
            Category
            <select
              name="categoryId"
              value={recipe.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
              placeholder="Describe the recipe..."
              rows="3"
            />
          </label>

          <label>
            Instructions
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="How should the recipe be prepared?"
              rows="6"
            />
          </label>

          <div className="create-recipe-row">
            <label>
              Preparation Time (minutes)
              <input
                type="number"
                name="prepTime"
                value={recipe.prepTime}
                onChange={handleChange}
                min="0"
              />
            </label>

            <label>
              Calories
              <input
                type="number"
                name="calories"
                value={recipe.calories}
                onChange={handleChange}
                min="0"
              />
            </label>
          </div>

          <div className="create-recipe-actions">
            <button type="submit" className="create-recipe-button">
              Create Recipe
            </button>

            <button
              type="button"
              className="cancel-recipe-button"
              onClick={() => navigate("/recipes")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateRecipe;
