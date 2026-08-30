import { useEffect, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5169/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Healthy Meal Planner</h1>

      <h2>Recipes</h2>

      {recipes.map((recipe) => (
        <div key={recipe.recipeId}>
          <h3>{recipe.recipeName}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
