import React from "react";
import { Box, Pagination } from "@mui/material";
import { remToPixels } from "../helpers/helpers";

const PaginationComponent = ({ handlePageChange, page, totalCount, limit }) => {
  return (
    <React.Fragment>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Pagination
          page={page}
          count={Math.ceil(totalCount / limit)}
          onChange={handlePageChange}
          shape="rounded"
          sx={{
            margin: "0.2rem",
            "& .MuiPaginationItem-root": {
              border: "1px solid #ccc",
              backgroundColor: "transparent",
              color: "#36454F",
              fontSize: remToPixels(0.75),
              "&.Mui-selected": {
                backgroundColor: "gray",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "gray",
                  color: "white",
                  fontWeight: "bold",
                },
              },
            },
            "& .MuiPaginationItem-ellipsis": {
              width: "2rem",
              height: "2rem",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              backgroundColor: "transparent",
              color: "#333",
              "&.Mui-disabled": {
                color: "#ccc",
              },
            },
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default PaginationComponent;
