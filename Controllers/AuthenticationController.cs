using ContactTracker.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContactTracker.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ILogger<AuthenticationController> _logger;
        public AuthenticationController(
            ILogger<AuthenticationController> logger
            ) => _logger = logger;

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Login person)
        {
            var response = new ApiResponse();
            if (person == null)
            {
                response.Status = "Failed";                
                return BadRequest(response);
            }

            DatabaseLoginHelper db = new DatabaseLoginHelper();
            bool authenticated = db.AuthenticateUser(person);
            response.Status = authenticated ? "Passed" : "Failed";
            response.Result = authenticated;

            return Ok(response);
        }
    }
}