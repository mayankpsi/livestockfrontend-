import React from 'react';
import { Box } from "@mui/material";
import {TabPane} from './';
import useDateFormat from '../hooks/useDateFormat';

const LocationStatusCard = ({data}) => {
  const {formattedDate} = useDateFormat();
  const liveStockStatus = data?.liveStocklocationStatus?.toLowerCase();
  return (
    <Box className="radius-10" sx={{background:`${liveStockStatus === "safe"?"rgba(71, 205, 116, 0.24)":"rgba(255, 0, 0, 0.24)"}`, p:'0px 20px'}}>
       <TabPane
            text="Status"
            secondaryText={formattedDate(data?.lastUpdate)}
            btnText={liveStockStatus || "N/A"}
            btnIcon={false}
            btnBgColor={liveStockStatus ===  "safe"?"#47CD75":"#FF0000"}
            onBtnClick={() => {}}
          />
    </Box>
  );
}

export default LocationStatusCard;
