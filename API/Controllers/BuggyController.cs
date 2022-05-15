using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuggyController : BaseController
    {
        [HttpGet]
        [Route("/not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }

        [HttpGet]
        [Route("/bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ProblemDetails {Title = " This is a bad request " });
        }

        [HttpGet]
        [Route("/un-auth")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized();
        }

        [HttpGet]
        [Route("/validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1","This is the first problem");
            return ValidationProblem();
        }

        [HttpGet]
        [Route("/server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("Just a normal Exception");
        }
    }
}
