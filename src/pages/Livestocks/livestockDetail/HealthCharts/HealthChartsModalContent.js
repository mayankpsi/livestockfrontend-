import { Stack } from "@mui/material";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { DatePicker } from "../../../../ComponentsV2";
import CustomDateRangePicker from "../../../../ComponentsV2/dateRangePicker";

const HealthChartsModalContent = ({
  selectedDate,
  setSelectedDate,
  children,
  label,
  dateRange
}) => {
  return (
    <Stack
      sx={{
        borderRadius: "4px",
        p: 2,
        mt: 2,
        border: "1px solid rgba(0,0,0,0.3)",
        gap: 2,
        minHeight:600
      }}
    >
      <Stack
        direction="row"
        alignItems={"start"}
        justifyContent="space-between"
        width="100%"
      >
        <TypographyPrimary
          sx={{ fontSize: "18px", mt: 0, textTransform: "capitalize" }}
        >
          {label} overview
        </TypographyPrimary>
        {dateRange ? (
          <CustomDateRangePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        ) : (
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
      </Stack>
      <Stack>{children}</Stack>
    </Stack>
  );
};

export default HealthChartsModalContent;
