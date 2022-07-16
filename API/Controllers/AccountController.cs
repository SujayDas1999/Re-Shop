using API.Data;
using API.Entity;
using API.Entity.Dto;
using API.Extension;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;
        private readonly StoreContext context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context) : base()
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login([FromBody]LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.UserName);
            if (user == null || !await this.userManager.CheckPasswordAsync(user, loginDto.Password)) return Unauthorized();

            var userBasket = await RetrieveBasket(loginDto.UserName);
            var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);
            if(anonBasket!=null)
            {
                if (userBasket != null) this.context.Baskets.Remove(userBasket);
                anonBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await this.context.SaveChangesAsync();
            }

            return new UserDto
            { 
                Email = user.Email,
                Token = await this.tokenService.GenegrateToken(user),
                Basket = anonBasket != null ? anonBasket.MapBasketToBasketDto() : userBasket?.MapBasketToBasketDto(),
            
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var user = new User { UserName = registerDto.UserName, Email = registerDto.Email };
            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                foreach(var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                    return ValidationProblem();
                }
            }

            await this.userManager.AddToRoleAsync(user, "Member");

            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await this.userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);
            return new UserDto
            {
                Email = user.Email,
                Token = await this.tokenService.GenegrateToken(user),
                Basket = userBasket?.MapBasketToBasketDto()
            };
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await this.context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == buyerId);
        }


    }
}
