import { Grid } from "@mui/material";
import ProductCardSkeleton from "../../app/layout/ProductCardSkeleton";
import { Product } from "../../app/models/Product";
import { useAppSelector } from "../../app/store/ConfigureStore";
import ProductCard from "../productCard/productCard";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  return (
    <>
      <Grid container spacing={4}>
        {products.map((item, index) => (
          <Grid item xs={4} key={item.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard index={index} item={item}></ProductCard>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductList;
