import { Box, Stack } from "@mui/material";
import React from "react";
import {AddCircleOutlineOutlinedIcon} from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";

const AddBtn = ({onClick}) => {
  return (
    <Box sx={{display:'flex', flexDirection:'column',alignItems:'flex-start'}}>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ background: "#F7F8FD", width: 300, height: 300, p: 2 }}
      >
        <AddCircleOutlineOutlinedIcon sx={{ fontSize: 150, cursor: "none" }} />
        <ButtonPrimary
          sx={{
            width: "100%",
            py: 2,
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            mt: 4.5,
          }}
          onClick={onClick}
        >
          Assign Livestock
        </ButtonPrimary>
      </Stack>
      <TypographyPrimary>
        Assign this collar to available livestock.
      </TypographyPrimary>
      <TypographyPrimary sx={{textAlign:'center', width:300}}>
      Note : If no livestock is available then go to Livestock management - Add new Livestock
      </TypographyPrimary>
    </Box>
  );
};

export default AddBtn;
