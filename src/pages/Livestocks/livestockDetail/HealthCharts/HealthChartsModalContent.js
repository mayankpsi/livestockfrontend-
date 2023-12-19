import { Stack, Box } from "@mui/material";
import { useState } from "react";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { DatePicker, Spinner } from "../../../../ComponentsV2";
import { CloseIcon } from "../../../../icons";

const HealthChartsModalContent = ({
  selectedDate,
  setSelectedDate,
  children,
  onModalClose,
  label
}) => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1000);
  return (
    <Stack p={2}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TypographyPrimary sx={{ fontSize: "21px", mb: 0, }}>
          Historical Data
        </TypographyPrimary>
        <CloseIcon fontSize="large" onClick={onModalClose} />
      </Box>
      <Stack
        sx={{
          borderRadius: "4px",
          p: 2,
          mt: 2,
          border: "1px solid rgba(0,0,0,0.3)",
          gap: 2,
          height: "70vh",
        }}
      >
        <Stack
          direction="row"
          alignItems={"start"}
          justifyContent="space-between"
          width="100%"
        >
          <TypographyPrimary sx={{ fontSize: "18px", mt: 0, textTransform:'capitalize', color:"rgba(0,0,0,0.6)" }}>
            {label} overview
          </TypographyPrimary>
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        {loading ? (
        
            <Spinner />
        ) : (
          <Stack>{children}</Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default HealthChartsModalContent;
