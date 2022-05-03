using API.Data;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class Products : ControllerBase
    {
        private readonly StoreContext context;

        public Products(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var result = await this.context.Products.ToListAsync();
            if (result == null) return NoContent();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var result = await this.context.Products.SingleAsync(p => p.Id == id);
            if(result == null) return NotFound();
            return Ok(result);
        }
    }
}
