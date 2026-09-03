namespace HealthyMealPlanner.API.Models;

public class Recipe
{
    public int RecipeId { get; set; }

    public int CategoryId { get; set; }
    
    public string? ImageUrl { get; set; }

    public string RecipeName { get; set; } = string.Empty;

    public List<RecipeIngredient> Ingredients { get; set; } = new List<RecipeIngredient>();

    public string? Description { get; set; }

    public string? Instructions { get; set; }

    public int? PrepTime { get; set; }

    public int? Calories { get; set; }

    public Category? Category { get; set; } = null!;
}