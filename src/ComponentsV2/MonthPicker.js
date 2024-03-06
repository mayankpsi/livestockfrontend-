import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const MonthPicker = ({ label, value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={["DatePicker"]}  sx={{p:0}}>
        <DatePicker
          views={["year", "month"]}
          label={label}
          value={value}
          onChange={setValue}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MonthPicker;
