using HealthyMealPlanner.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HealthyMealPlanner.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AccountController(
        UserManager<ApplicationUser> userManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    // POST: api/account/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterModel model)
    {
        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email
        };

        var result = await _userManager.CreateAsync(user, model.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(new
        {
            message = "User registered successfully!"
        });
    }

    // POST: api/account/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var passwordValid = await _userManager.CheckPasswordAsync(
            user,
            model.Password
        );

        if (!passwordValid)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        // Create claims for the user
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName ?? user.Email ?? "")
        };

        // Get user's roles
        var roles = await _userManager.GetRolesAsync(user);

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        // Create signing key
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        // Create JWT
        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2), // TODO: Implement refresh token
            signingCredentials: credentials
        );

        // Convert token to string
        var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

        return Ok(new
        {
            message = "Login successful!",
            token = tokenString
        });
    }

    // GET: api/account
    [Authorize]
    [HttpGet]
    public IActionResult TestAuth()
    {
        return Ok("You are authenticated!");
    }
}