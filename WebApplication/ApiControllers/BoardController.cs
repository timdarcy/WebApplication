using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.ApiControllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BoardController : ControllerBase
    {
        
        [HttpPost("updateState")]
        public IActionResult UpdateState([FromBody] string state)
        {
            return Ok(new
            {
                State = state
            });
        }

        [HttpGet("getState")]
        public IActionResult getState()
        {
            return Ok(new
            {
                State = "this is some state"
            }); 
        }
    }
}
