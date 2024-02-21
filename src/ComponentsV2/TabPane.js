import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { AddCircleOutlineIcon } from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";

const TabPane = ({
  text,
  btnText,
  btnIcon,
  onBtnClick,
  btnBgColor,
  type,
  secondaryText,
  btnColor,
  hover,
  loading,
  search,
  onSearch,
  minWidth,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    let val = e.target?.value;
    setQuery(val);
    onSearch?.(val);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <TypographyPrimary
          sx={{ fontSize: "2rem", textTransform: "capitalize" }}
        >
          {text}
        </TypographyPrimary>
        {secondaryText && (
          <TypographyPrimary sx={{ textTransform: "capitalize" }}>
            {secondaryText}
          </TypographyPrimary>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        {search && (
          <TextField
            fullWidth
            id={"search-box"}
            disabled={false}
            variant="outlined"
            size="large"
            sx={{ mr: 1 }}
            value={query}
            InputProps={{
              endAdornment: false ? (
                <InputAdornment position="end">
                  <CircularProgress size={20} />
                </InputAdornment>
              ) : null,
            }}
            onChange={handleSearch}
            placeholder={`Search by name...`}
          />
        )}
        <ButtonPrimary
          disabled={loading}
          sx={{
            background: btnBgColor ? btnBgColor : "#B58B5D",
            p: "8px 15px",
            color: `${btnColor ? btnColor : "#fff"}`,
            cursor: `${!hover ? "default" : "pointer"}`,
            display: "flex",
            justifyContent: "center",
            minWidth: `${minWidth || "auto"}`,
            "&:hover": { backgroundColor: !hover ? btnBgColor : "" },
          }}
          onClick={onBtnClick}
          type={type}
          startIcon={
            btnIcon
              ? btnIcon || <AddCircleOutlineIcon fontSize="large" />
              : null
          }
        >
          {btnText}
        </ButtonPrimary>
      </Box>
    </Stack>
  );
};

export default TabPane;
