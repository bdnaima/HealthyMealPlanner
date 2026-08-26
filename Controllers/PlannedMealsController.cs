using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlannedMeal>>> GetPlannedMeals()
    {
        return await _context.PlannedMeals.ToListAsync();
    }

    // POST: api/plannedmeals
    [HttpPost]
    public async Task<ActionResult<PlannedMeal>> CreatePlannedMeal(PlannedMeal plannedMeal)
    {
        _context.PlannedMeals.Add(plannedMeal);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetPlannedMeals),
            new { id = plannedMeal.PlannedMealId },
            plannedMeal
        );
    }

    // PUT: api/plannedmeals/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePlannedMeal(int id, PlannedMeal plannedMeal)
    {
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
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlannedMeal(int id)
    {
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