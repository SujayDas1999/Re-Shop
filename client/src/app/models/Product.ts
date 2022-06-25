export interface Product {
  id?: number;
  name?: string;
  desciption?: string;
  price?: number;
  pictureUrl?: string;
  type?: string;
  brand?: string;
  quantityInStock?: number;
}

export interface ProductParams {
  orderBy: string;
  search?: string;
  brands?: string[];
  type?: string[];
  pageNumber: number;
  pageSize: number;
}
