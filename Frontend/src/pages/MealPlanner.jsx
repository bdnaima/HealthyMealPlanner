import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getPlannedMeals,
  deletePlannedMeal,
  getRecipes,
  createPlannedMeal,
} from "../services/api";

import "./MealPlanner.css";

function MealPlanner() {
  const [plannedMeals, setPlannedMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [addingForDate, setAddingForDate] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Load user's planned meals
  useEffect(() => {
    async function loadMeals() {
      try {
        const data = await getPlannedMeals(token);
        setPlannedMeals(data);
      } catch (error) {
        setError(error.message);
      }
    }

    loadMeals();
  }, [token]);

  // Load recipes for the Add Meal dropdown
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

  // Add a meal to the selected day
  async function handleAddMeal(date) {
    if (!selectedRecipe) {
      setError("Please select a recipe.");
      return;
    }

    try {
      const newMeal = await createPlannedMeal(
        Number(selectedRecipe),
        date.toISOString().split("T")[0],
        token,
      );

      setPlannedMeals((meals) => [...meals, newMeal]);

      setSelectedRecipe("");
      setAddingForDate(null);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  // Delete a planned meal
  async function handleDelete(id) {
    try {
      await deletePlannedMeal(id, token);

      setPlannedMeals((meals) =>
        meals.filter((meal) => meal.plannedMealId !== id),
      );
    } catch (error) {
      setError(error.message);
    }
  }

  // Get today's date
  const today = new Date();

  // Find Monday of the current week
  const dayOfWeek = today.getDay();

  const monday = new Date(today);

  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  monday.setDate(today.getDate() + difference);

  monday.setDate(monday.getDate() + weekOffset * 7);

  // Create the seven days of the week
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);

    date.setDate(monday.getDate() + index);

    return date;
  });

  // Get meals belonging to a specific day
  function getMealsForDay(date) {
    return plannedMeals.filter((meal) => {
      const mealDate = new Date(meal.mealDate);

      return (
        mealDate.getFullYear() === date.getFullYear() &&
        mealDate.getMonth() === date.getMonth() &&
        mealDate.getDate() === date.getDate()
      );
    });
  }

  return (
    <main className="meal-planner-page">
      <div className="meal-planner-header">
        <h1>My Meal Planner</h1>

        <p>Plan your meals for the week and stay organized.</p>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="week-navigation">
        <button
          type="button"
          onClick={() => setWeekOffset((current) => current - 1)}
        >
          ← Previous Week
        </button>

        <div className="week-title">
          <h2>
            {weekDays[0].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
            {" – "}
            {weekDays[6].toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </h2>

          {weekOffset !== 0 && (
            <button
              type="button"
              className="today-button"
              onClick={() => setWeekOffset(0)}
            >
              Back to This Week
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setWeekOffset((current) => current + 1)}
        >
          Next Week →
        </button>
      </div>

      <div className="week-grid">
        {weekDays.map((date, index) => {
          const meals = getMealsForDay(date);

          const isToday = date.toDateString() === today.toDateString();

          return (
            <div
              className={`day-card ${isToday ? "today" : ""}`}
              key={date.toISOString()}
            >
              {/* Day header */}
              <div className="day-header">
                <div>
                  <h2>
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h2>

                  <span>
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {isToday && <span className="today-label">Today</span>}
              </div>

              {/* Meals for this day */}
              <div className="day-meals">
                {meals.length === 0 ? (
                  <p className="empty-day">No meal planned</p>
                ) : (
                  meals.map((meal) => (
                    <div className="planned-meal" key={meal.plannedMealId}>
                      <h3>{meal.recipe?.recipeName}</h3>

                      <span className="meal-category">
                        {meal.recipe?.category?.categoryName || "No category"}
                      </span>

                      <div className="planned-meal-actions">
                        <Link
                          to={`/recipes/${meal.recipe?.recipeId}`}
                          className="view-meal-recipe"
                        >
                          View Recipe
                        </Link>

                        <button
                          type="button"
                          className="remove-meal"
                          onClick={() => handleDelete(meal.plannedMealId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Meal */}
              {addingForDate === index ? (
                <div className="add-meal-form">
                  <select
                    value={selectedRecipe}
                    onChange={(event) => setSelectedRecipe(event.target.value)}
                  >
                    <option value="">Select a recipe</option>

                    {recipes.map((recipe) => (
                      <option key={recipe.recipeId} value={recipe.recipeId}>
                        {recipe.recipeName}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="confirm-add-button"
                    onClick={() => handleAddMeal(date)}
                  >
                    Add Meal
                  </button>

                  <button
                    type="button"
                    className="cancel-add-button"
                    onClick={() => {
                      setAddingForDate(null);
                      setSelectedRecipe("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="add-meal-button"
                  onClick={() => setAddingForDate(index)}
                >
                  + Add Meal
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MealPlanner;
