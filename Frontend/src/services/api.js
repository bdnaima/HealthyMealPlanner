const API_URL = "http://localhost:5169/api";

// Get all recipes
export async function getRecipes() {
    const response = await fetch(`${API_URL}/recipes`);

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    return response.json();
}

// Get a single recipe by ID
export async function getRecipe(id) {
    const response = await fetch(`${API_URL}/recipes/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch recipe");
    }

    const data = await response.json();

    console.log("Recipe from API:", data);

    return data;
}

// Create a new recipe
export async function createRecipe(recipe, token) {
    const response = await fetch(
        `${API_URL}/recipes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(recipe),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create recipe.");
    }

    return response.json();
}

// Update a recipe
export async function updateRecipe(id, recipe, token) {
    const response = await fetch(
        `${API_URL}/recipes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipeId: Number(id),
                categoryId: Number(recipe.categoryId),
                recipeName: recipe.recipeName,
                description: recipe.description,
                instructions: recipe.instructions,
                prepTime: recipe.prepTime
                    ? Number(recipe.prepTime)
                    : null,
                calories: recipe.calories
                    ? Number(recipe.calories)
                    : null,
                imageUrl: recipe.imageUrl || null,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update recipe.");
    }

    return response.status === 204
        ? null
        : response.json();
}

// Delete a recipe
export async function deleteRecipe(id, token) {
    const response = await fetch(
        `${API_URL}/recipes/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete recipe.");
    }
}

// Register a new user
export async function registerUser(email, password) {
    const response = await fetch(`${API_URL}/account/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage =
            data?.message ||
            data?.[0]?.description ||
            "Registration failed";

        throw new Error(errorMessage);
    }

    return data;
}

// Login a user
export async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/account/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
}

// Get Planned Meals
export async function getPlannedMeals(token) {
    const response = await fetch(`${API_URL}/plannedmeals`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch planned meals");
    }

    return response.json();
}

// Create a Planned Meal
export async function createPlannedMeal(recipeId, mealDate, token) {
    const response = await fetch(`${API_URL}/plannedmeals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            recipeId,
            mealDate,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to add meal");
    }

    return response.json();
}

// Delete a Planned Meal
export async function deletePlannedMeal(id, token) {
    const response = await fetch(`${API_URL}/plannedmeals/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete meal");
    }
}

// Get all categories
export async function getCategories() {
    const response = await fetch(
        `${API_URL}/categories`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return response.json();
}

export async function createCategory(category, token) {
    const response = await fetch(
        `${API_URL}/categories`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create category.");
    }

    return response.json();
}


export async function updateCategory(id, category, token) {
    const response = await fetch(
        `${API_URL}/categories/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update category.");
    }

    return response.status === 204
        ? null
        : response.json();
}


export async function deleteCategory(id, token) {
    const response = await fetch(
        `${API_URL}/categories/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete category.");
    }
}

// Get all foods
export async function getFoods(token) {
    const response = await fetch(
        `${API_URL}/foods`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch foods.");
    }

    return response.json();
}


// Create a Food
export async function createFood(food, token) {
    const response = await fetch(
        "http://localhost:5169/api/foods",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(food),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create food.");
    }

    return response.json();
}


// Update a Food
export async function updateFood(id, food, token) {
    const response = await fetch(
        `http://localhost:5169/api/foods/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                foodId: Number(id),
                foodName: food.foodName,
                caloriesPer100g: food.caloriesPer100g
                    ? Number(food.caloriesPer100g)
                    : null,
                proteinPer100g: food.proteinPer100g
                    ? Number(food.proteinPer100g)
                    : null,
                carbsPer100g: food.carbsPer100g
                    ? Number(food.carbsPer100g)
                    : null,
                fatPer100g: food.fatPer100g
                    ? Number(food.fatPer100g)
                    : null,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update food.");
    }

    return response.status === 204
        ? null
        : response.json();
}


// Delete a Food
export async function deleteFood(id, token) {
    const response = await fetch(
        `http://localhost:5169/api/foods/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete food.");
    }
}


// Get all recipe ingredients
export async function getRecipeIngredients(token) {
    const response = await fetch(
        `${API_URL}/recipeingredients`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipe ingredients.");
    }

    return response.json();
}

// Create a Recipe Ingredient
export async function createRecipeIngredient(
    ingredient,
    token
) {
    const response = await fetch(
        `${API_URL}/recipeingredients`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(ingredient),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to add ingredient.");
    }

    return response.json();
}


// Update a Recipe Ingredient
export async function updateRecipeIngredient(id, ingredient, token) {
    const response = await fetch(
        `http://localhost:5169/api/recipeingredients/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                recipeIngredientId: Number(id),
                recipeId: Number(ingredient.recipeId),
                foodId: Number(ingredient.foodId),
                quantity: ingredient.quantity
                    ? Number(ingredient.quantity)
                    : null,
                unit: ingredient.unit || null,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update ingredient.");
    }

    return response.status === 204
        ? null
        : response.json();
}


// Delete a Recipe Ingredient
export async function deleteRecipeIngredient(id, token) {
    const response = await fetch(
        `${API_URL}/recipeingredients/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete ingredient.");
    }
}