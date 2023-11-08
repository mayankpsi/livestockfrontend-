import React from 'react';
import { Box } from "@mui/material";
import {TabPane} from './';
import useDateFormat from '../hooks/useDateFormat';

const LocationStatusCard = ({data}) => {
  const {formattedDate} = useDateFormat();
  return (
    <Box className="radius-10" sx={{background:'rgba(71, 205, 116, 0.24)',p:'0px 20px'}}>
       <TabPane
            text="Status"
            secondaryText={formattedDate(data?.lastUpdate)}
            btnText={data?.status?"Safe":"Unsafe"}
            btnIcon={false}
            btnBgColor="#47CD75"
            onBtnClick={() => {}}
          />
    </Box>
  );
}

export default LocationStatusCard;
