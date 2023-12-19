import React from "react";
import { LineChart } from "./";
import { Stack, Box, Typography } from "@mui/material";
import { TypographySecondary } from "./themeComponents";
import { useTheme } from "@emotion/react";
import { CropFreeIcon } from "../icons";

const ChartCard = ({
  label,
  value,
  icon,
  colors,
  valueColor,
  suffix,
  onViewData,
  children,
}) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      flexGrow={1}
      gap={{ xl: 0, lg: 0, md: 0 }}
      width="100%"
      alignItems="center"
      p={2}
      pb={0}
      pt={3}
      border={"1px solid #dddddd"}
      borderRadius="10px"
      justifyContent="space-evenly"
      position="relative"
    >
      <CropFreeIcon
        sx={{ position: "absolute", top: 15, right: 15 }}
        fontSize="large"
        onClick={() => onViewData(label)}
      />
      <Stack direction="column" alignItems="center" gap={3}>
        <Box
          className="flex-row-center border-circle"
          sx={{
            width: 85,
            height: 85,
            background: `${colors?.bg}`,
            border: `1px solid ${colors?.main}`,
          }}
        >
          {icon}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Box sx={{ display: "flex", flexGrow: 1, gap: 1 }}>
            <TypographySecondary
              className="flex-row-center"
              sx={{
                fontSize: "2rem",
                color: "#696969",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              {label}
            </TypographySecondary>
            <Typography
              className={`${valueColor}`}
              sx={{
                fontSize: "2.5rem",
                fontWeight: "bolder",
              }}
            >
              {value ? value+suffix : "0" + suffix}
            </Typography>
          </Box>
          <TypographySecondary
            className="flex-row-center"
            sx={{
              fontSize: "1.4rem",
              color: theme.palette.primary.main,
              cursor: "pointer",
            }}
            onClick={() => onViewData(label)}
          >
            View Historical Data
          </TypographySecondary>
        </Box>
      </Stack>
      <Stack
        sx={{
          width: { xl: "80%", lg: "75%", md: "65%", sm: "65%" },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default ChartCard;
