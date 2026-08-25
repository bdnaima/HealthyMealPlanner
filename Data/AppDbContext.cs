using Microsoft.EntityFrameworkCore;
using HealthyMealPlanner.API.Models;

namespace HealthyMealPlanner.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Role> Roles { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<MealPlan> MealPlans { get; set; }
    public DbSet<PlannedMeal> PlannedMeals { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<RecipeIngredient> RecipeIngredients { get; set; }
    public DbSet<Food> Foods { get; set; }
}