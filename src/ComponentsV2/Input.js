import * as React from "react";
import {Box, TextField, MenuItem} from "@mui/material";
import { createTheme } from "@mui/material/styles";

export default function CustomInput({ label, name, value, onChange,register, errors, isError, disabled, select, selectData}) {


  const labelFontSize = "1.7rem";
  const theme = createTheme({
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: labelFontSize,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            fontSize: labelFontSize,
          },
        },
      },
    },
  });

  return (
    <Box sx={{width:'100%', p:1.5}}>
      <TextField
       sx={{background:'#fff', textTransform:'capitalize'}}
        disabled={disabled}
        fullWidth
        id={name}
        select={select}
        label={label}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        {...register(name,{required:true})}
        onChange={onChange}
        error={errors?.[name]?true:false || isError?.error}
        helperText={errors?.[name]?.message || isError?.message}
      >
        {
          select && (
            selectData?.map((option) => (
              <MenuItem key={option?.id} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))
          )
        }
      </TextField>
      </Box>
  );
}
