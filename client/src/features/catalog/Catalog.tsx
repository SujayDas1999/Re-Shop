import { useEffect, useState } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "../productList/productList";

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((result) => result.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products}></ProductList>
    </>
  );
}

export default Catalog;
