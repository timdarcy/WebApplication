using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models.ApiModels;

namespace WebApplication.ApiControllers
{
    [Authorize]
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] Register model)
        {
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]Update model)
        {
            return Ok();
        }
    }
}
