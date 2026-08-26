namespace HealthyMealPlanner.API.Models;

public class PlannedMeal
{
    public int PlannedMealId { get; set; }

    public int MealPlanId { get; set; }

    public int RecipeId { get; set; }

    public DateTime MealDate { get; set; }

    public string? MealType { get; set; }

    public MealPlan? MealPlan { get; set; } = null!;

    public Recipe? Recipe { get; set; } = null!;
}