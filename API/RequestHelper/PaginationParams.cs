﻿namespace API.RequestHelper
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 6;
        public int PageSize 
        { 
            get 
            { 
                return _pageSize; 
            } 
            set 
            { 
                _pageSize = value > MaxPageSize ? MaxPageSize : value; 
            } 
        }

        private MetaData MetaData { get; set; }
    }
}