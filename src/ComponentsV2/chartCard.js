import React from "react";
import {LineChart} from "./";
import { Stack, Box, Typography } from "@mui/material";
import { TypographySecondary } from "./themeComponents";

const ChartCard = ({ label, value, icon, iconBg, valueColor, chartData,suffix }) => {
  return (
    <Stack
      direction="row"
      flexGrow={1}
      gap={{xl:5, lg:5, md:2}}
      height="150px"
      width="100%"
      alignItems="center"
      p={2}
      border={"1px solid #dddddd"}
      borderRadius="10px"
      justifyContent="space-evenly"
    >
      <Stack direction="row" alignItems="center" gap={2}>
        <Box
          className="flex-row-center border-circle"
          sx={{ width: 65, height: 65, background: `${iconBg}` }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TypographySecondary
            className="flex-row-center"
            sx={{ fontSize: "1.6rem", color: "#696969",display:"flex",justifyContent:'flex-start' }}
          >
            {label}
          </TypographySecondary>
          <Typography
            className={`${valueColor}`}
            sx={{ fontSize: "2.2rem", fontWeight: "bolder" }}
          >
            {value?value+suffix:"0"}
          </Typography>
        </Box>
      </Stack>
      <Stack sx={{width:{xl:"80%", lg:'75%', md:'65%', sm:'65%'}, height:'100px'}}>
      <LineChart chartData={chartData}/>
      </Stack>
    </Stack>
  );
};

export default ChartCard;
