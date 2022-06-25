import { Box, Typography, Pagination } from "@mui/material";
import React from "react";
import { MetaData } from "../models/Pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;

  return (
    <Box sx={{ marginTop: 5 }} display={"flex"} justifyContent="space-between">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1} -{" "}
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        count={totalPages}
        color={"primary"}
        size={"large"}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
      />
    </Box>
  );
}

export default AppPagination;
