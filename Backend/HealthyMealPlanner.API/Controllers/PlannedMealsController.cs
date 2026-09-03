using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlannedMealsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PlannedMealsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/plannedmeals
    [Authorize]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlannedMeal>>> GetPlannedMeals()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        return await _context.PlannedMeals
            .Where(pm => pm.UserId == userId)
            .Include(pm => pm.Recipe)
            .ThenInclude(r => r.Category)
            .ToListAsync();
    }

    // POST: api/plannedmeals
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<PlannedMeal>> CreatePlannedMeal(
        PlannedMeal plannedMeal)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        plannedMeal.UserId = userId;

        _context.PlannedMeals.Add(plannedMeal);

        await _context.SaveChangesAsync();

        var createdMeal = await _context.PlannedMeals
            .Where(pm => pm.PlannedMealId == plannedMeal.PlannedMealId)
            .Include(pm => pm.Recipe)
            .ThenInclude(r => r.Category)
            .FirstOrDefaultAsync();

        return CreatedAtAction(
            nameof(GetPlannedMeals),
            new { id = plannedMeal.PlannedMealId },
            createdMeal
        );
    }

    // PUT: api/plannedmeals/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlannedMeal(
        int id,
        PlannedMeal plannedMeal)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        if (id != plannedMeal.PlannedMealId)
        {
            return BadRequest();
        }

        // Find the existing meal and make sure it belongs to the logged-in user
        var existingMeal = await _context.PlannedMeals
            .FirstOrDefaultAsync(pm =>
                pm.PlannedMealId == id &&
                pm.UserId == userId);

        if (existingMeal == null)
        {
            return NotFound();
        }

        // Update only the fields the user is allowed to change
        existingMeal.RecipeId = plannedMeal.RecipeId;
        existingMeal.MealDate = plannedMeal.MealDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/plannedmeals/5
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlannedMeal(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId == null)
        {
            return Unauthorized();
        }

        // Find the meal AND make sure it belongs to the logged-in user
        var plannedMeal = await _context.PlannedMeals
            .FirstOrDefaultAsync(pm =>
                pm.PlannedMealId == id &&
                pm.UserId == userId);

        if (plannedMeal == null)
        {
            return NotFound();
        }

        _context.PlannedMeals.Remove(plannedMeal);

        await _context.SaveChangesAsync();

        return NoContent();
    }

}
