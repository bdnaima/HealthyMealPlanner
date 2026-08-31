import { jwtDecode } from "jwt-decode";

export function getToken() {
    return localStorage.getItem("token");
}

export function getUserRole() {
    const token = getToken();

    if (!token) {
        return null;
    }

    try {
        const decodedToken = jwtDecode(token);

        return (
            decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] || null
        );
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

export function isAdmin() {
    return getUserRole() === "Admin";
}

export function isLoggedIn() {
    return !!getToken();
}