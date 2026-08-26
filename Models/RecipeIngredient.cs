namespace HealthyMealPlanner.API.Models;

public class RecipeIngredient
{
    public int RecipeIngredientId { get; set; }

    public int RecipeId { get; set; }

    public int FoodId { get; set; }

    public decimal? Quantity { get; set; }

    public string? Unit { get; set; }

    public Recipe? Recipe { get; set; } = null!;

    public Food? Food { get; set; } = null!;
}