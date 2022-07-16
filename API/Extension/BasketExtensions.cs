using API.Entity;
using API.Entity.Dto;
using System.Linq;

namespace API.Extension
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToBasketDto(this Basket basket)
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
