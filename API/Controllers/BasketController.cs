using API.Data;
using API.Entity;
using API.Entity.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null)
                return NotFound();
            return MapBasketToDto(basket);
        }



        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {

            var basket = await RetrieveBasket();

            if (basket == null)
            {
                basket = CreateBasket();
            }

            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();

            basket.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Problem Saving Item to basket"  });
        }


        [HttpDelete]
        public async Task<ActionResult> DeleteItemFromBasket(int productId, int quantity)
        {
            //get basket
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            var productQuantity = getBasketQuantity(basket,productId);
             
            if(productQuantity < quantity)
            {
                throw new Exception("Quantity to be deleted greater than available quantity in the basket");
            }

            //remove the item or reduce quantity
            basket.RemoveItem(productId, quantity);
            //save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok("Product deleted successfully");
            return BadRequest(new ProblemDetails { Title = "Problem remvoing the product" });
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
            };

            Response.Cookies.Append("buyerId", buyerId,cookieOptions);
            var basket = new Basket
            {
                BuyerId = buyerId,
            };

            _context.Add(basket);
            return basket;
        }

        private int getBasketQuantity(Basket basket, int productId)
        {
            var quantity = basket.Items.SingleOrDefault(x => x.ProductId == productId).Quantity;
            return quantity;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                BuyerId = basket.BuyerId,
                Id = basket.Id,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Brand = item.Product.Brand,
                    PictureUrl = item.Product.PictureUrl,
                    Price = item.Product.Price,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

    }
}
