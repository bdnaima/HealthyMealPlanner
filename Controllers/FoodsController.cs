using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoodsController : ControllerBase
{
    private readonly AppDbContext _context;

    public FoodsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/foods
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Food>>> GetFoods()
    {
        return await _context.Foods.ToListAsync();
    }

    // POST: api/foods
    [HttpPost]
    public async Task<ActionResult<Food>> CreateFood(Food food)
    {
        _context.Foods.Add(food);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetFoods),
            new { id = food.FoodId },
            food
        );
    }

    // PUT: api/foods/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateFood(int id, Food food)
    {
        if (id != food.FoodId)
        {
            return BadRequest();
        }

        _context.Entry(food).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!FoodExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool FoodExists(int id)
    {
        return _context.Foods.Any(e => e.FoodId == id);
    }

    // DELETE: api/foods/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFood(int id)
    {
        var food = await _context.Foods.FindAsync(id);

        if (food == null)
        {
            return NotFound();
        }

        _context.Foods.Remove(food);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}