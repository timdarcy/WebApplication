using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Interfaces;
using WebApplication.Models.ApiModels;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication.Helpers;
using System.Text;
using WebApplication.Models.DataModels;
using Microsoft.Extensions.Options;

namespace WebApplication.ApiControllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private readonly AppSettings _appSettings;
        public UserController(IUserService userService, IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            var user = _userService.GetUser(model.Email, model.Password);
            if (user == null)
            {
                return BadRequest(new ErrorResponse(new List<Error> {new Error("User cannot be verified") }));
            }
            var key = Encoding.UTF8.GetBytes(_appSettings.Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateEncodedJwt(tokenDescriptor);
            return Ok(new
            {
                User = user,
                Token = token
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] Register model)
        {
            var user = new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email
            };
            var result = _userService.CreateUser(user, model.Password);
            if (result == Enums.UserStatus.UserExists)
            {
                return BadRequest(new ErrorResponse(new List<Error> { new Error("User already exists") }));
            }
            
            return Ok();
            
            
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id, [FromBody]Update model)
        {
            return Ok();
        }
    }
}
