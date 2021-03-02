using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactTracker.Common;
namespace ContactTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        public LoginController(
            ILogger<LoginController> logger
            ) => _logger = logger;

        [HttpPost]
        [Route("Login")]
        public object AddLogin([FromBody] Login person)
        {
            if (person == null)
            {
                return null;
            }

            DatabaseLoginHelper db = new DatabaseLoginHelper();
            db.AddLogin(person);
            return null;
        }
    }
}