namespace HealthyMealPlanner.API.Models;

public class Food
{
    public int FoodId { get; set; }

    public string FoodName { get; set; } = string.Empty;

    public decimal? CaloriesPer100g { get; set; }

    public decimal? ProteinPer100g { get; set; }

    public decimal? CarbsPer100g { get; set; }

    public decimal? FatPer100g { get; set; }

    public ICollection<RecipeIngredient> RecipeIngredients { get; set; } =
        new List<RecipeIngredient>();
}