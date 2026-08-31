namespace HealthyMealPlanner.API.Models;

public class PlannedMeal
{
    public int PlannedMealId { get; set; }
    public string UserId { get; set; } = string.Empty;
    public int RecipeId { get; set; }
    public DateTime MealDate { get; set; }
    public Recipe? Recipe { get; set; } = null!;
}