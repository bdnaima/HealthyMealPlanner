using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecipesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/recipes
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Recipe>>> GetRecipes()
    {
        return await _context.Recipes
            .Include(r => r.Category)
            .Include(r => r.Ingredients)
            .ThenInclude(ri => ri.Food)
            .ToListAsync();
    }

    // GET: api/recipes/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Recipe>> GetRecipe(int id)
    {
        var recipe = await _context.Recipes
            .Include(r => r.Category)
            .Include(r => r.Ingredients)
                .ThenInclude(i => i.Food)
            .FirstOrDefaultAsync(r => r.RecipeId == id);

        if (recipe == null)
        {
            return NotFound();
        }

        return Ok(new
        {
            recipe.RecipeId,
            recipe.RecipeName,
            recipe.Description,
            recipe.Instructions,
            recipe.PrepTime,
            recipe.Calories,

            category = recipe.Category == null
            ? null
            : new
            {
                recipe.Category.CategoryId,
                recipe.Category.CategoryName
            },

            ingredients = recipe.Ingredients.Select(i => new
            {
                i.RecipeIngredientId,
                i.Quantity,
                i.Unit,

                food = new
                {
                    i.Food.FoodId,
                    i.Food.FoodName,
                    i.Food.CaloriesPer100g,
                    i.Food.ProteinPer100g,
                    i.Food.CarbsPer100g,
                    i.Food.FatPer100g
                }
            })
        });
    }

    // POST: api/recipes
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Recipe>> CreateRecipe(Recipe recipe)
    {
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRecipes),
            new { id = recipe.RecipeId },
            recipe
        );
    }

    // PUT: api/recipes/5
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipe(int id, Recipe recipe)
    {
        if (id != recipe.RecipeId)
        {
            return BadRequest();
        }

        _context.Entry(recipe).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RecipeExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool RecipeExists(int id)
    {
        return _context.Recipes.Any(e => e.RecipeId == id);
    }

    // DELETE: api/recipes/5
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);

        if (recipe == null)
        {
            return NotFound();
        }

        _context.Recipes.Remove(recipe);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

