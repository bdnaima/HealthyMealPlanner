using HealthyMealPlanner.API.Data;
using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly AppDbContext _context;

    public RolesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/roles
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Role>>> GetRoles()
    {
        return await _context.ApplicationRoles.ToListAsync();
    }

    // POST: api/roles
    [HttpPost]
    public async Task<ActionResult<Role>> CreateRole(Role role)
    {
        _context.ApplicationRoles.Add(role);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRoles),
            new { id = role.RoleId },
            role
        );
    }

    // PUT: api/roles/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRole(int id, Role role)
    {
        if (id != role.RoleId)
        {
            return BadRequest();
        }

        _context.Entry(role).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!RoleExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    private bool RoleExists(int id)
    {
        return _context.ApplicationRoles.Any(e => e.RoleId == id);
    }

    // DELETE: api/roles/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var role = await _context.ApplicationRoles.FindAsync(id);

        if (role == null)
        {
            return NotFound();
        }

        _context.ApplicationRoles.Remove(role);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}