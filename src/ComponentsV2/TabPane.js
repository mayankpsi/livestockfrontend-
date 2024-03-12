import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { AddCircleOutlineIcon } from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";
import ExportAsCSV from "./ExportAsCSV";

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
  selectValue,
  selectOptions,
  onSelectChange,
  exportable,
  secondaryBtnLoading,
  csvFormate,
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    let val = e.target?.value;
    setQuery(val);
    onSearch?.(val);
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box p={1}>
        <TypographyPrimary
          sx={{ fontSize: "2rem", textTransform: "capitalize", m: 0 }}
        >
          {text}
        </TypographyPrimary>
        {secondaryText && (
          <TypographyPrimary sx={{ textTransform: "capitalize", m: 0 }}>
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
            variant="outlined"
            size="large"
            sx={{ mr: 1, minWidth: "18rem" }}
            value={query}
            InputProps={{
              sx: { height: "5vh" },
            }}
            onChange={handleSearch}
            placeholder={`Search by name...`}
          />
        )}

        {selectValue ? (
          <TextField
            fullWidth
            select
            sx={{ minWidth: "10rem" }}
            InputProps={{
              sx: { height: "5vh" },
            }}
            value={selectValue}
            onChange={(e) => onSelectChange(e.target.value)}
          >
            {selectOptions?.map((ele) => (
              <MenuItem value={ele?.value}>{ele?.label}</MenuItem>
            ))}
          </TextField>
        ) : null}

        {btnText ? (
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
        ) : null}
        {exportable && (
          <ButtonPrimary
            disabled={secondaryBtnLoading}
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
          >
            <ExportAsCSV
              headers={csvFormate?.headers || []}
              data={csvFormate?.data || []}
              fileName={csvFormate?.name || "data-as-csv"}
            >
              Export
            </ExportAsCSV>
          </ButtonPrimary>
        )}
      </Box>
    </Stack>
  );
};

export default TabPane;
