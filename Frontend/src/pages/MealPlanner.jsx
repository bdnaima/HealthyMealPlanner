import { useEffect, useState } from "react";
import { getPlannedMeals, deletePlannedMeal } from "../services/api";

function MealPlanner() {
  const [plannedMeals, setPlannedMeals] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

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

  return (
    <main>
      <h1>Meal Planner</h1>

      <p>Plan your meals and stay organized.</p>

      {error && <p>{error}</p>}

      {plannedMeals.length === 0 ? (
        <p>You haven't planned any meals yet.</p>
      ) : (
        plannedMeals.map((meal) => (
          <div key={meal.plannedMealId}>
            <h2>{meal.recipe?.recipeName}</h2>

            <p>{new Date(meal.mealDate).toLocaleDateString()}</p>

            <p>{meal.recipe?.category?.categoryName}</p>

            <button onClick={() => handleDelete(meal.plannedMealId)}>
              Remove
            </button>
          </div>
        ))
      )}
    </main>
  );
}

export default MealPlanner;
