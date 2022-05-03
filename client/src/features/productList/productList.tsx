import { Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import ProductCard from "../productCard/productCard";

interface Props {
  products: Product[];
}

function productList({ products }: Props) {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((item, index) => (
          <Grid item xs={3} key={item.id}>
            <ProductCard index={index} item={item}></ProductCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default productList;
