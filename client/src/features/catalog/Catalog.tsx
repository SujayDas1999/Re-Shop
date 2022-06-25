import { Box, Grid, Pagination, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import AppPagination from "../../app/shared/AppPagination";
import CheckBoxGroup from "../../app/shared/CheckBoxGroup";
import RadioButtonGroup from "../../app/shared/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import ProductList from "../productList/productList";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./CatalogSlice";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];

function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);

  if (!filtersLoaded)
    return <LoadingComponent message="Loading Products ..." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch></ProductSearch>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            options={sortOptions}
            selectedValue={productParams.orderBy}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            options={brands}
            onChange={(items: any) =>
              dispatch(setProductParams({ brands: items }))
            }
            selectedOptions={productParams.brands}
          ></CheckBoxGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxGroup
            options={types}
            onChange={(items: any) =>
              dispatch(setProductParams({ type: items }))
            }
            selectedOptions={productParams.type}
          ></CheckBoxGroup>
        </Paper>
      </Grid>
      <Grid item xs={9} sx={{ mb: 2 }}>
        <ProductList products={products}></ProductList>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Catalog;
