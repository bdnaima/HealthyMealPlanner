import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe, updateRecipe } from "../services/api";
import "./EditRecipe.css";

import asianBeef from "../assets/asian_beef.jpg";
import beefJuicy from "../assets/beef_juicy.jpg";
import chickenBeanSalad from "../assets/chicken_bean_sallad.jpg";
import chickenTomatoSalad from "../assets/chicken_tomoat_sallad.jpg";
import chickpeasLentils from "../assets/chickpeas_lentils.jpg";
import chiliConCarne from "../assets/chili_con_corne.jpg";
import salmonAsparagus from "../assets/salmon_asparagus.jpg";
import salmonBaked from "../assets/salmon_baked.jpg";

const recipeImages = [
  { name: "Asian Beef", path: asianBeef },
  { name: "Juicy Beef", path: beefJuicy },
  { name: "Chicken Bean Salad", path: chickenBeanSalad },
  { name: "Chicken Tomato Salad", path: chickenTomatoSalad },
  { name: "Chickpeas & Lentils", path: chickpeasLentils },
  { name: "Chili Con Carne", path: chiliConCarne },
  { name: "Salmon & Asparagus", path: salmonAsparagus },
  { name: "Baked Salmon", path: salmonBaked },
];

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [recipe, setRecipe] = useState({
    recipeName: "",
    description: "",
    instructions: "",
    prepTime: "",
    calories: "",
    categoryId: "",
    imageUrl: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        const data = await getRecipe(id);

        setRecipe({
          recipeName: data.recipeName || "",
          description: data.description || "",
          instructions: data.instructions || "",
          prepTime: data.prepTime || "",
          calories: data.calories || "",
          categoryId: data.categoryId || "",
          imageUrl: data.imageUrl || "",
        });
      } catch (error) {
        setError(error.message);
      }
    }

    loadRecipe();
  }, [id]);

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
      await updateRecipe(id, recipe, token);

      setMessage("Recipe updated successfully!");

      setTimeout(() => {
        navigate(`/recipes/${id}`);
      }, 800);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="edit-recipe-page">
      <div className="edit-recipe-container">
        <h1>Edit Recipe</h1>

        <p className="edit-recipe-intro">
          Update the recipe information below.
        </p>

        {error && <p className="error-message">{error}</p>}

        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <label>
            Recipe Name
            <input
              type="text"
              name="recipeName"
              value={recipe.recipeName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              value={recipe.description}
              onChange={handleChange}
              rows="3"
            />
          </label>

          <label>
            Recipe Image
            <select
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
            >
              <option value="">Select an image</option>

              {recipeImages.map((image) => (
                <option key={image.name} value={image.path}>
                  {image.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Instructions
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              rows="6"
            />
          </label>

          <div className="edit-recipe-row">
            <label>
              Preparation Time (minutes)
              <input
                type="number"
                name="prepTime"
                value={recipe.prepTime}
                onChange={handleChange}
              />
            </label>

            <label>
              Calories
              <input
                type="number"
                name="calories"
                value={recipe.calories}
                onChange={handleChange}
              />
            </label>
          </div>

          <label>
            Category ID
            <input
              type="number"
              name="categoryId"
              value={recipe.categoryId}
              onChange={handleChange}
              required
            />
          </label>

          <div className="edit-recipe-actions">
            <button type="submit" className="save-recipe-button">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-recipe-button"
              onClick={() => navigate(`/recipes/${id}`)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditRecipe;
