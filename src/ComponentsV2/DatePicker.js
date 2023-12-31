import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { addDays } from 'date-fns';
import { useEffect, useState, useRef } from "react";
import { Stack, TextField, InputAdornment } from "@mui/material";
import useDateFormat from "../hooks/useDateFormat";
import { CalendarMonthIcon } from "../icons";

const DatePicker = ({selectedDate, setSelectedDate}) => {
  const [open, setOpen] = useState(false);
  const calenderRef = useRef(null);
  const { paginationDateFormat } = useDateFormat();

  useEffect(() => {
    setSelectedDate(new Date(), "date");
  }, []);

  useEffect(() => {
    document?.addEventListener("click", handleClickOutsideTheCalender, true);
  }, []);

  const handleClickOutsideTheCalender = (e) => {
    if (calenderRef.current && !calenderRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setOpen(false);
  };
  return (
    <div>
      <Stack sx={{ position: "relative" }}>
        <Stack direction="row" gap={1}>
          {selectedDate ? (
            <TextField
              value={paginationDateFormat(selectedDate,"date")}
              placeholder="MM/DD/YYYY"
              size="small"
              sx={{width:140}}
              onClick={() => setOpen(!open)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonthIcon />
                  </InputAdornment>
                ),
              }}
            />
          ) : null}
        </Stack>
        <Stack
          ref={calenderRef}
          sx={{
            position: "absolute",
            top: "55px",
            left: "150px",
            zIndex: "1000000",
          }}
        >
          {open && (
            <Calendar
              date={new Date()}
              onChange={handleSelect}
              className="calendarElement"
              maxDate={addDays(new Date(),0)}
            />
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default DatePicker;
