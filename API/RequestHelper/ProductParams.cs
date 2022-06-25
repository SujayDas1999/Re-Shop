namespace API.RequestHelper
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string Search { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
    }
}
