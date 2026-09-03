import { useEffect, useState } from "react";

import { getFoods, createFood, updateFood, deleteFood } from "../services/api";

import { isAdmin } from "../services/auth";

import { Navigate } from "react-router-dom";

import "./AdminFoods.css";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    foodName: "",
    caloriesPer100g: "",
    proteinPer100g: "",
    carbsPer100g: "",
    fatPer100g: "",
  });

  const token = localStorage.getItem("token");

  // Load foods
  async function loadFoods() {
    try {
      const data = await getFoods(token);
      setFoods(data);
    } catch (error) {
      setError(error.message);
    }
  }

  // Load foods when page opens
  useEffect(() => {
    if (isAdmin()) {
      loadFoods();
    }
  }, [token]);

  // Only Admins can access this page
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
      foodName: "",
      caloriesPer100g: "",
      proteinPer100g: "",
      carbsPer100g: "",
      fatPer100g: "",
    });

    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    try {
      if (editingId) {
        await updateFood(editingId, formData, token);

        setMessage("Food updated successfully.");

        // Reload the foods after editing
        await loadFoods();
      } else {
        const newFood = await createFood(formData, token);

        setFoods((current) => [...current, newFood]);

        setMessage("Food added successfully.");
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEdit(food) {
    setEditingId(food.foodId);

    setFormData({
      foodName: food.foodName || "",
      caloriesPer100g: food.caloriesPer100g ?? "",
      proteinPer100g: food.proteinPer100g ?? "",
      carbsPer100g: food.carbsPer100g ?? "",
      fatPer100g: food.fatPer100g ?? "",
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
      "Are you sure you want to delete this food?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteFood(id, token);

      setFoods((current) => current.filter((food) => food.foodId !== id));

      setMessage("Food deleted successfully.");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="admin-foods-page">
      <div className="admin-foods-container">
        <header className="admin-foods-header">
          <span className="admin-badge">Admin</span>

          <h1>Manage Foods</h1>

          <p>Add and manage the foods used as ingredients in your recipes.</p>
        </header>

        {error && <p className="admin-foods-error">{error}</p>}

        {message && <p className="admin-foods-success">{message}</p>}

        <section className="food-form-card">
          <h2>{editingId ? "Edit Food" : "Add New Food"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="food-form-grid">
              <label>
                Food Name
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleChange}
                  placeholder="e.g. Chicken breast"
                  required
                />
              </label>

              <label>
                Calories per 100g
                <input
                  type="number"
                  step="0.01"
                  name="caloriesPer100g"
                  value={formData.caloriesPer100g}
                  onChange={handleChange}
                  placeholder="165"
                />
              </label>

              <label>
                Protein per 100g
                <input
                  type="number"
                  step="0.01"
                  name="proteinPer100g"
                  value={formData.proteinPer100g}
                  onChange={handleChange}
                  placeholder="31"
                />
              </label>

              <label>
                Carbs per 100g
                <input
                  type="number"
                  step="0.01"
                  name="carbsPer100g"
                  value={formData.carbsPer100g}
                  onChange={handleChange}
                  placeholder="0"
                />
              </label>

              <label>
                Fat per 100g
                <input
                  type="number"
                  step="0.01"
                  name="fatPer100g"
                  value={formData.fatPer100g}
                  onChange={handleChange}
                  placeholder="3.6"
                />
              </label>
            </div>

            <div className="food-form-actions">
              <button type="submit" className="save-food-button">
                {editingId ? "Update Food" : "Add Food"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-food-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="foods-list-section">
          <h2>Existing Foods</h2>

          {foods.length === 0 ? (
            <p className="no-foods">No foods found.</p>
          ) : (
            <div className="foods-list">
              {foods.map((food) => (
                <article className="food-item" key={food.foodId}>
                  <div className="food-info">
                    <h3>{food.foodName}</h3>

                    <div className="nutrition-info">
                      <span>Calories: {food.caloriesPer100g ?? "-"}</span>

                      <span>Protein: {food.proteinPer100g ?? "-"}g</span>

                      <span>Carbs: {food.carbsPer100g ?? "-"}g</span>

                      <span>Fat: {food.fatPer100g ?? "-"}g</span>
                    </div>
                  </div>

                  <div className="food-actions">
                    <button
                      className="edit-food-button"
                      onClick={() => handleEdit(food)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-food-button"
                      onClick={() => handleDelete(food.foodId)}
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

export default AdminFoods;
