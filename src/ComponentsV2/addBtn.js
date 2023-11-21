import { Box, Stack } from "@mui/material";
import React from "react";
import {AddCircleOutlineOutlinedIcon} from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";

const AddBtn = ({text1,text2,onClick}) => {
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
          Assign {text1}
        </ButtonPrimary>
      </Stack>
      <TypographyPrimary>
        Assign this {text2} to available {text1}.
      </TypographyPrimary>
      <TypographyPrimary sx={{textAlign:'center', width:300}}>
      Note : If no {text1} is available then go to {text1} management - Add new {text1}
      </TypographyPrimary>
    </Box>
  );
};

export default AddBtn;
