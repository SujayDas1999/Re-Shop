import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { setProductParams } from "./CatalogSlice";

function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(
    productParams.search
  );
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ search: event.target.value }));
  }, 2000);

  return (
    <>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      ></TextField>
    </>
  );
}

export default ProductSearch;
