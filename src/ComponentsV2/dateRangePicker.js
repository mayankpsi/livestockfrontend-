import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useEffect, useState, useRef } from "react";
import { Stack, TextField } from "@mui/material";
import format from "date-fns/format";

export default function CustomDateRangePicker({selectedDate,setSelectedDate}) {
  const [showInput, setShowInput] = useState(false);


  const calenderRef = useRef(null);

  useEffect(() => {
   document?.addEventListener("click", handleClickOutsideTheCalender, true)
  },[]);

  const handleClickOutsideTheCalender = (e) => {
    if(calenderRef.current && !calenderRef.current.contains(e.target)){
      setShowInput(false)
    }
  }

  return (
    <Stack sx={{position:'relative'}}>
      <Stack direction="row" gap={1}>
      <TextField value={`${format(selectedDate[0]?.startDate, "MM/dd/yyyy")} - ${format(selectedDate[0]?.endDate, "MM/dd/yyyy")}`} placeholder="MM/DD/YYYY" onClick={()=> setShowInput(!showInput)}/>
      </Stack>
      <Stack ref={calenderRef} sx={{position:'absolute',top:'60px',left:'-150px', zIndex:'1000000' }}>
      {
        showInput?(
          <DateRange
        onChange={(item) =>  setSelectedDate([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={true}
        months={1}
        ranges={selectedDate}
        direction="horizontal"
      />
        ):null
      }
      </Stack>
    </Stack>
  );
}
