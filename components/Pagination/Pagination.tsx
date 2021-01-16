import { Box, IconButton, Typography } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import React from "react";

export interface PaginationProps {
  count: number;
  perPage: number;
  currentPage: number; // zero based
  onChange?: (page: number) => void;
}

export function Pagination({
  perPage,
  count,
  currentPage,
  onChange,
}: PaginationProps) {
  const totalPages = count <= perPage ? 1 : Math.ceil(count / perPage);
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;
  const nextHandler = () => onChange && !isLast && onChange(currentPage + 1);
  const prevHandler = () => onChange && !isFirst && onChange(currentPage - 1);
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="body1">
        {currentPage + 1} out of {totalPages} pages
      </Typography>
      <div>
        <IconButton size="small" onClick={prevHandler} disabled={isFirst}>
          <NavigateBeforeRoundedIcon fontSize="large" />
        </IconButton>
        <IconButton size="small" onClick={nextHandler} disabled={isLast}>
          <NavigateNextRoundedIcon fontSize="large" />
        </IconButton>
      </div>
    </Box>
  );
}
