import React from 'react';
import { Box } from "@mui/material";
import {TabPane} from './';

const LocationStatusCard = ({data}) => {
  return (
    <Box className="radius-10" sx={{background:'rgba(71, 205, 116, 0.24)',p:'0px 20px'}}>
       <TabPane
            text="Status"
            secondaryText={data?.lastUpdate}
            btnText={data?.status?"Safe":"Unsafe"}
            btnIcon={false}
            btnBgColor="#47CD75"
            onBtnClick={() => {}}
          />
    </Box>
  );
}

export default LocationStatusCard;
