import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import MealPlanner from "./pages/MealPlanner";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFoods from "./pages/AdminFoods";
import AdminIngredients from "./pages/AdminIngredients";
import AdminCategories from "./pages/AdminCategories";

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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/foods" element={<AdminFoods />} />
        <Route path="/admin/ingredients" element={<AdminIngredients />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
