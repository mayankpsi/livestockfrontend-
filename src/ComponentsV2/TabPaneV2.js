import { Box, Stack } from "@mui/material";
import { TypographyPrimary,ButtonPrimary } from "./themeComponents";
import CustomDateRangePicker from "./dateRangePicker";

const TabPaneV2 = ({
  paneText,
  paneTextColor,
  isBtn,
  btnText,
  btnColor,
  btnBg,
  datePicker,
  onBtnClick,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TypographyPrimary
        sx={{
          textTransform: "capitalize",
          color: paneTextColor,
          fontSize: "2rem",
        }}
      >
        {paneText}
      </TypographyPrimary>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        {datePicker ? (
          <Stack
            direction="row"
            justifyContent="flex-end"
            height="37px"
            gap={1}
            width="100%"
            sx={{ position: "block", zIndex: 110000 }}
          >
            <CustomDateRangePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Stack>
        ) : null}
        {!isBtn && (
          <ButtonPrimary
            sx={{
              fontSize: "1.2rem",
              padding: "5px 15px",
              color: btnColor,
              background: btnBg,
            }}
            onClick={onBtnClick}
          >
            {btnText}
          </ButtonPrimary>
        )}
      </Box>
    </Stack>
  );
};

export default TabPaneV2;
