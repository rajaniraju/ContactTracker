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
            if (person == null)
            {
                return null;
            }

            DatabaseLoginHelper db = new DatabaseLoginHelper();
            bool authenticated = db.AuthenticateUser(person);

            return Ok(authenticated);
        }
    }
}