using API.Data;
using API.Entity;
using API.Extension;
using API.RequestHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class Products : BaseController
    {
        private readonly StoreContext context;

        public Products(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery]ProductParams productParams)
        {
            var query = this.context.Products.Sort(productParams.OrderBy).Search(productParams.Search).Filter(productParams.Brand,productParams.Type).AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var result = await this.context.Products.FindAsync(id);
            if(result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await this.context.Products.Select(prop => prop.Brand).Distinct().ToListAsync();
            var types = await this.context.Products.Select(prop => prop.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }
    }
}
