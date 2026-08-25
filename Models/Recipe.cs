namespace HealthyMealPlanner.API.Models;

public class Recipe
{
    public int RecipeId { get; set; }

    public int CategoryId { get; set; }

    public string RecipeName { get; set; } = string.Empty;

    public string? Description { get; set; }

    public string? Instructions { get; set; }

    public int? PrepTime { get; set; }

    public int? Calories { get; set; }

    public Category? Category { get; set; } = null!;

    public ICollection<PlannedMeal> PlannedMeals { get; set; } = new List<PlannedMeal>();
}