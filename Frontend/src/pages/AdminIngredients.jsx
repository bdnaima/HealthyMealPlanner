import { useEffect, useState } from "react";

import {
  getRecipeIngredients,
  createRecipeIngredient,
  updateRecipeIngredient,
  deleteRecipeIngredient,
  getRecipes,
  getFoods,
} from "../services/api";

import { isAdmin } from "../services/auth";

import { Navigate } from "react-router-dom";

import "./AdminIngredients.css";

function AdminIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [foods, setFoods] = useState([]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    recipeId: "",
    foodId: "",
    quantity: "",
    unit: "",
  });

  const token = localStorage.getItem("token");

  // Load ingredients
  async function loadIngredients() {
    try {
      const data = await getRecipeIngredients(token);

      setIngredients(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Load recipes
  async function loadRecipes() {
    try {
      const data = await getRecipes();

      setRecipes(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Load foods
  async function loadFoods() {
    try {
      const data = await getFoods(token);

      setFoods(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Load everything when page opens
  useEffect(() => {
    if (isAdmin()) {
      loadIngredients();
      loadRecipes();
      loadFoods();
    }
  }, [token]);

  // Protect page
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setFormData({
      recipeId: "",
      foodId: "",
      quantity: "",
      unit: "",
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      if (editingId) {
        await updateRecipeIngredient(editingId, formData, token);

        setMessage("Ingredient updated successfully.");

        await loadIngredients();
      } else {
        const newIngredient = await createRecipeIngredient(
          {
            recipeId: Number(formData.recipeId),
            foodId: Number(formData.foodId),
            quantity: formData.quantity ? Number(formData.quantity) : null,
            unit: formData.unit || null,
          },
          token,
        );

        setIngredients((current) => [...current, newIngredient]);

        setMessage("Ingredient added successfully.");
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(ingredient) {
    setEditingId(ingredient.recipeIngredientId);

    setFormData({
      recipeId: ingredient.recipeId,
      foodId: ingredient.foodId,
      quantity: ingredient.quantity ?? "",
      unit: ingredient.unit ?? "",
    });

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this ingredient?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteRecipeIngredient(id, token);

      setIngredients((current) =>
        current.filter((ingredient) => ingredient.recipeIngredientId !== id),
      );

      setMessage("Ingredient deleted successfully.");

      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="admin-ingredients-page">
      <div className="admin-ingredients-container">
        <header className="admin-ingredients-header">
          <span className="admin-badge">Admin</span>

          <h1>Manage Ingredients</h1>

          <p>Add and manage the ingredients used in your recipes.</p>
        </header>

        {error && <p className="admin-ingredients-error">{error}</p>}

        {message && <p className="admin-ingredients-success">{message}</p>}

        <section className="ingredient-form-card">
          <h2>{editingId ? "Edit Ingredient" : "Add New Ingredient"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="ingredient-form-grid">
              <label>
                Recipe
                <select
                  name="recipeId"
                  value={formData.recipeId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a recipe</option>

                  {recipes.map((recipe) => (
                    <option key={recipe.recipeId} value={recipe.recipeId}>
                      {recipe.recipeName}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Food
                <select
                  name="foodId"
                  value={formData.foodId}
                  onChange={handleChange}
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
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 200"
                />
              </label>

              <label>
                Unit
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="g, ml, tbsp..."
                />
              </label>
            </div>

            <div className="ingredient-form-actions">
              <button type="submit" className="save-ingredient-button">
                {editingId ? "Update Ingredient" : "Add Ingredient"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-ingredient-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="ingredients-list-section">
          <h2>Existing Ingredients</h2>

          {ingredients.length === 0 ? (
            <p className="no-ingredients">No ingredients found.</p>
          ) : (
            <div className="ingredients-list">
              {ingredients.map((ingredient) => (
                <article
                  className="ingredient-item"
                  key={ingredient.recipeIngredientId}
                >
                  <div className="ingredient-info">
                    <h3>
                      {ingredient.recipe?.recipeName ||
                        `Recipe #${ingredient.recipeId}`}
                    </h3>

                    <p>
                      <strong>
                        {ingredient.food?.foodName ||
                          `Food #${ingredient.foodId}`}
                      </strong>
                    </p>

                    <span>
                      {ingredient.quantity ?? "-"} {ingredient.unit || ""}
                    </span>
                  </div>

                  <div className="ingredient-actions">
                    <button
                      className="edit-ingredient-button"
                      onClick={() => handleEdit(ingredient)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-ingredient-button"
                      onClick={() =>
                        handleDelete(ingredient.recipeIngredientId)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminIngredients;
