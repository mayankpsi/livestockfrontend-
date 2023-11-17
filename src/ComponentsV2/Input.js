import * as React from "react";
import { Box, TextField, MenuItem, Typography } from "@mui/material";

export default function CustomInput({
  label,
  name,
  value,
  onChange,
  register,
  errors,
  isError,
  disabled,
  select,
  selectData,
  selectNoDataMsg
}) {
  return (
    <Box sx={{ width: "100%", p: 1.5 }}>
      <TextField
        sx={{ background: "#fff", textTransform: "capitalize" }}
        disabled={disabled}
        fullWidth
        id={name}
        select={select}
        label={label}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        {...register(name, { required: true })}
        onChange={onChange}
        error={errors?.[name] ? true : false || isError?.error}
        helperText={errors?.[name]?.message || isError?.message}
      >
        {select && selectData?.length ? (
          selectData?.map((option) => (
            <MenuItem key={option?.id} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="">
           <Typography sx={{fontWeight:'bold', color:'black'}}>{selectNoDataMsg?selectNoDataMsg:"No data"}</Typography>
          </MenuItem>
        )}
      </TextField>
    </Box>
  );
}
