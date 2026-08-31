import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import MealPlanner from "./pages/MealPlanner";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/admin/recipes/create" element={<CreateRecipe />} />
        <Route path="/admin/recipes/edit/:id" element={<EditRecipe />} />
        <Route path="/meal-planner" element={<MealPlanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
