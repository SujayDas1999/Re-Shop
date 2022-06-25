using API.Entity;
using System.Collections.Generic;
using System.Linq;

namespace API.Extension
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string sortType)
        {
            if (string.IsNullOrWhiteSpace(sortType)) return query;

           return query = sortType switch
           {
               "price" => query.OrderBy(prop => prop.Price),
               "priceDesc" => query.OrderByDescending(prop => prop.Price),
               "name" => query.OrderBy(prop => prop.Name),
               "nameDesc" => query.OrderByDescending(prop => prop.Name),
               _ => query.OrderBy(prop => prop.Name),
           };

        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchText)
        {
            if(string.IsNullOrEmpty(searchText)) return query;

            var search = searchText.Trim().ToLower();

            return query.Where(prop => prop.Name.ToLower().Contains(search));
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brand, string type)
        {
            var BrandFilter = new List<string>();
            var TypeFilter = new List<string>();    

            if(!string.IsNullOrEmpty(brand))
            {
                BrandFilter.AddRange(brand.ToLower().Split(",").ToList());
            }

            if(! string.IsNullOrEmpty(type))
            {
                TypeFilter.AddRange(type.ToLower().Split(",").ToList());
            }

            query = query.Where(prop => BrandFilter.Count == 0 || BrandFilter.Contains(prop.Brand.ToLower()));
            query = query.Where(prop => TypeFilter.Count == 0 || TypeFilter.Contains(prop.Type.ToLower()));

            return query;
        }
    }
}
