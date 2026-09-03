# 🥗 Healthy Meal Planner

A full-stack web application for discovering healthy recipes, planning weekly meals, and managing recipe data.

The project was developed as a final project during my Fullstack .NET studies at Lexicon. The main goal was to build a functional full-stack application using a .NET backend, React frontend, database integration, authentication, and role-based authorization.

---

## 📌 About the Project

Healthy Meal Planner helps users organize their meals and discover healthy recipes in one place.

Users can:

- Browse available recipes
- Search for recipes
- View recipe details and ingredients
- Add recipes to their weekly Meal Planner
- Remove planned meals
- Navigate between previous and future weeks
- Register and log in to their account

Administrators have additional access to manage the application's data.

---

## ✨ Features

### 👤 User Features

- User registration and login
- JWT-based authentication
- Browse recipes
- Search recipes by name
- View recipe details
- View ingredients and cooking instructions
- Add recipes to the Meal Planner
- Remove planned meals
- View previous and upcoming weeks

### 🔐 Admin Features

Administrators have access to a separate Admin Dashboard where they can manage:

- Recipes
- Categories
- Foods
- Users
- Recipe ingredients

Admin-only functionality is protected using role-based authorization.

---

## 🛠️ Technologies

### Frontend

- React
- Vite
- JavaScript
- React Router DOM
- CSS

### Backend

- ASP.NET Core Web API
- C#
- Entity Framework Core
- ASP.NET Core Identity
- JWT Bearer Authentication

### Database

- MySQL
- Entity Framework Core Migrations

### Development Tools

- Visual Studio Code
- Scalar for API testing
- Git & GitHub
- Trello for project planning

---

## 🏗️ Project Structure

```text
HealthyMealPlanner
│
├── HealthyMealPlanner.API
│   ├── Controllers
│   ├── Models
│   ├── Data
│   ├── Migrations
│   └── Program.cs
│
└── healthy-meal-planner-frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── services
    │   └── assets
    └── ...
```

---

## 🗄️ Database Structure

The application uses MySQL with Entity Framework Core.

Main entities include:

- **Roles**
- **Users**
- **MealPlans**
- **PlannedMeals**
- **Recipes**
- **Categories**
- **RecipeIngredients**
- **Foods**

### Relationships

```text
Roles
  │
  ▼
Users
  │
  ▼
MealPlans
  │
  ▼
PlannedMeals
  │
  ▼
Recipes
  │
  ├── Categories
  │
  └── RecipeIngredients
          │
          ▼
        Foods
```

---

## 🔑 Authentication & Authorization

The application uses **ASP.NET Core Identity** together with **JWT Bearer Authentication**.

When a user logs in, a JWT token is generated and used for authenticated API requests.

Role-based authorization is used to separate normal users from administrators.

For example:

```csharp
[Authorize(Roles = "Admin")]
```

This ensures that only users with the `Admin` role can access protected admin functionality.

---

## 🔄 API

The backend is built as a RESTful Web API.

Examples of implemented operations include:

```text
GET     /api/recipes
POST    /api/recipes
PUT     /api/recipes/{id}
DELETE  /api/recipes/{id}

GET     /api/categories
POST    /api/categories
PUT     /api/categories/{id}
DELETE  /api/categories/{id}

GET     /api/foods
POST    /api/foods
PUT     /api/foods/{id}
DELETE  /api/foods/{id}
```

The API was tested during development using **Scalar**.

---

## 🍽️ Meal Planner

The Meal Planner allows authenticated users to organize recipes by day.

Users can:

- Add a recipe to a specific day
- View planned meals
- Remove meals
- Navigate to previous weeks
- Navigate to future weeks
- Return to the current week

The planned meals are connected to the logged-in user, so each user has their own meal planning data.

---

## 🖼️ Recipe Images

Recipes can have associated images.

Recipe images are stored locally in the frontend assets and the image path is stored with the recipe data.

Example:

```text
src/assets/images/
├── asian_beef.jpg
├── beef_juicy.jpg
├── chicken_bean_sallad.jpg
├── chicken_tomoat_sallad.jpg
├── chickpeas_lentils.jpg
├── chili_con_corne.jpg
├── salmon_asparagus.jpg
└── salmon_baked.jpg
```

---

## 🔍 Recipe Search

The application also includes a simple search functionality that allows users to search for recipes by recipe name.

This is currently implemented on the frontend.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- .NET SDK
- Node.js
- npm
- MySQL

### 1. Clone the repository

```bash
git clone <https://github.com/bdnaima/HealthyMealPlanner.git>
cd HealthyMealPlanner
```

### 2. Start the backend

Navigate to the API project:

```bash
cd HealthyMealPlanner.API
```

Restore dependencies:

```bash
dotnet restore
```

Run the database migrations:

```bash
dotnet ef database update
```

Start the API:

```bash
dotnet run
```

### 3. Start the frontend

Open another terminal and navigate to the frontend:

```bash
cd healthy-meal-planner-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will then be available at the local address shown by Vite.

---

## 🔮 Future Improvements

There are several features I would like to implement in the future:

- Improve and expand the UI/UX design
- Automatically generate a **grocery list** based on planned meals
- Add **Favourite Recipes**
- Add **Notifications and meal reminders**
- Add more recipes and categories
- Expand the recipe search with category and ingredient filtering
- Connect the newsletter form to a real email service

These features were outside the scope of the current three-week project period.

---

## 📚 What I Learned

This project gave me the opportunity to work with both frontend and backend development in the same application.

Some of the main things I worked with were:

- Building a REST API with ASP.NET Core
- Entity Framework Core and MySQL
- Database relationships and migrations
- Authentication with ASP.NET Core Identity
- JWT authentication
- Role-based authorization
- Connecting a React frontend to a .NET API
- CRUD operations
- API testing with Scalar
- Debugging and solving integration problems
- Using Git and GitHub for version control

---

## 👩‍💻 Project

**Healthy Meal Planner**
Full-stack project developed during the Lexicon Fullstack .NET program.

Built with **React + ASP.NET Core + Entity Framework Core + MySQL**.
