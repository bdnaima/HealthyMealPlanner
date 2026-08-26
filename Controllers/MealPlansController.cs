using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealPlansController : ControllerBase
{
    private readonly AppDbContext _context;

    public MealPlansController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/mealplans
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MealPlan>>> GetMealPlans()
    {
        return await _context.MealPlans.ToListAsync();
    }

    // POST: api/mealplans
    [HttpPost]
    public async Task<ActionResult<MealPlan>> CreateMealPlan(MealPlan mealPlan)
    {
        _context.MealPlans.Add(mealPlan);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetMealPlans),
            new { id = mealPlan.MealPlanId },
            mealPlan
        );
    }

    // PUT: api/mealplans/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMealPlan(int id, MealPlan mealPlan)
    {
        if (id != mealPlan.MealPlanId)
        {
            return BadRequest();
        }

        _context.Entry(mealPlan).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MealPlanExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool MealPlanExists(int id)
    {
        return _context.MealPlans.Any(e => e.MealPlanId == id);
    }

    // DELETE: api/mealplans/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMealPlan(int id)
    {
        var mealPlan = await _context.MealPlans.FindAsync(id);

        if (mealPlan == null)
        {
            return NotFound();
        }

        _context.MealPlans.Remove(mealPlan);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}