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
    public async Task<ActionResult<PlannedMeal>> CreatePlannedMeal(PlannedMeal plannedMeal)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        plannedMeal.UserId = userId;

        _context.PlannedMeals.Add(plannedMeal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetPlannedMeals),
            new { id = plannedMeal.PlannedMealId },
            plannedMeal
        );
    }

    // PUT: api/plannedmeals/5
    [Authorize]
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlannedMeal(int id, PlannedMeal plannedMeal)
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

        _context.Entry(plannedMeal).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PlannedMealExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool PlannedMealExists(int id)
    {
        return _context.PlannedMeals.Any(e => e.PlannedMealId == id);
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

        var plannedMeal = await _context.PlannedMeals.FindAsync(id);

        if (plannedMeal == null)
        {
            return NotFound();
        }

        _context.PlannedMeals.Remove(plannedMeal);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}