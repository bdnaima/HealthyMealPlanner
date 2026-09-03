using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecipeIngredientsController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecipeIngredientsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/recipeingredients
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecipeIngredient>>> GetRecipeIngredients()
    {
        return await _context.RecipeIngredients
            .Include(ri => ri.Recipe)
            .Include(ri => ri.Food)
            .ToListAsync();
    }

    // POST: api/recipeingredients
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<RecipeIngredient>> CreateRecipeIngredient(RecipeIngredient recipeIngredient)
    {
        _context.RecipeIngredients.Add(recipeIngredient);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRecipeIngredients),
            new { id = recipeIngredient.RecipeIngredientId },
            recipeIngredient
        );
    }

    // PUT: api/recipeingredients/5
    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecipeIngredient(int id, RecipeIngredient recipeIngredient)
    {
        if (id != recipeIngredient.RecipeIngredientId)
        {
            return BadRequest();
        }

        _context.Entry(recipeIngredient).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RecipeIngredientExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool RecipeIngredientExists(int id)
    {
        return _context.RecipeIngredients.Any(e => e.RecipeIngredientId == id);
    }

    // DELETE: api/recipeingredients/5
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipeIngredient(int id)
    {
        var recipeIngredient = await _context.RecipeIngredients.FindAsync(id);

        if (recipeIngredient == null)
        {
            return NotFound();
        }

        _context.RecipeIngredients.Remove(recipeIngredient);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}