import React from "react";
import { Box, Stack } from "@mui/material";
import { TypographySecondary } from "./themeComponents";

const StatusCard = ({text, status, icon, statusColor,suffix}) => {
  return (
    <Stack direction="row" justifyContent='space-between' sx={{border:'1px solid #DDDDDD',p:1.8, borderRadius:2, background:'#fff'}}>
      <Box sx={{display:'flex'}}>
        {icon}
        <TypographySecondary variant="h5">{text}</TypographySecondary>
      </Box>
      <TypographySecondary variant="h5" sx={{color:statusColor}}>{status?.includes("undefined")?"N/A":`${status}${suffix}`}</TypographySecondary>
    </Stack>
  );
};

export default StatusCard;
