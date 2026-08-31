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

    return response.json();
}

// Create a new recipe
export async function createRecipe(recipe, token) {
    const response = await fetch(
        "http://localhost:5169/api/recipes",
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
        `http://localhost:5169/api/recipes/${id}`,
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
        `http://localhost:5169/api/recipes/${id}`,
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

export async function testAuth() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/account`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || "Authentication failed");
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
        "http://localhost:5169/api/categories"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return response.json();
}