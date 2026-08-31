const API_URL = "http://localhost:5169/api";

// Get all recipes
export async function getRecipes() {
    const response = await fetch(`${API_URL}/recipes`);

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    return response.json();
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