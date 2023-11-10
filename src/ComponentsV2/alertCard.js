import React from "react";
import { Stack, Box, TextField } from "@mui/material";
import { TabPane, CustomLabel } from "./";
import { TypographyPrimary } from "./themeComponents";

const AlertCard = ({
  paneText,
  labelData,
  label,
  onBtnClick,
  isEdit,
  onChange,
  valueSuffix,
}) => {
  const getTextFiled = (label, name, value) => {
    return (
      <TextField
        fullWidth
        id={name}
        label={label}
        variant="outlined"
        size="large"
        sx={{ mr: 1, textTransform: "capitalize" }}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={`Please Enter your ${label}`}
      />
    );
  };

  const formattedLabel = (ind) => `${ind === 0 ? "Low" : "High"} ${label}`

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
      <Stack gap={isEdit ? 2 : 0}>
        {Object.keys(labelData)?.map((ele, ind) => {  
          if (isEdit) {
            return getTextFiled(formattedLabel(ind), ele, labelData[ele]);
          } else {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <CustomLabel
                  text={formattedLabel(ind)}
                  type={`${ind === 0 ? "warning" : "error"}`}
                  width={170}
                />
                <TypographyPrimary sx={{ fontSize: "2.2rem", mt: 1 }}>
                  {labelData[ele]}
                  {valueSuffix}
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
