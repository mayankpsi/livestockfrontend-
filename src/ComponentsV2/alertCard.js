import React from "react";
import { Stack, Box, TextField } from "@mui/material";
import {TabPane, CustomLabel} from "./";
import { TypographyPrimary } from "./themeComponents";

const AlertCard = ({ paneText, labelData, onBtnClick, onChange, isEdit,valueSuffix }) => {
  const getTextFiled = (label, name, value) => {
    return (
      <TextField
        fullWidth
        id={name}
        label={label}
        variant="outlined"
        size="large"
        sx={{ mr: 1, textTransform:'capitalize' }}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={`Please Enter your ${label}`}
      />
    );
  };

  return (
    <Stack
      className="radius-10"
      sx={{ border: "1px solid #dddddd", p: "5px 10px" }}
      flexGrow={1}
    >
      <TabPane
        text=""
        secondaryText={paneText}
        btnText={`${isEdit ? "Save" : "Edit"}`}
        btnIcon={false}
        btnBgColor="#B58B5D"
        onBtnClick={onBtnClick}
      />
      <Stack gap={isEdit?2:0}>
      {labelData?.map((ele) => {
        if (isEdit) {
          return getTextFiled(ele.label, ele.name, ele.value);
        } else {
          return (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <CustomLabel text={ele.label} type={ele.type} width={170} />
              <TypographyPrimary sx={{ fontSize: "2.2rem", mt: 1 }}>
                {ele.value}{valueSuffix}
              </TypographyPrimary>
            </Box>
          );
        }
      })}
      </Stack>
    </Stack>
  );
};

export default AlertCard;
