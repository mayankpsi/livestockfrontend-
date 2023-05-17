import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { BiWifi } from 'react-icons/bi';
const Status = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleOnline = () => {
    setIsOnline(true);
  };

  const handleOffline = () => {
    setIsOnline(false);
  };

  console.log('Online is', isOnline);
  return (
    <>
      <Grid
        container
        style={{
          columnGap: '10px',
        }}
        className=" flexDir mb20px"
      >
        <Typography className=" fs20px mb20px  fontWeight700">
          Status
        </Typography>

        <Grid
          container
          justifyContent="flex-start"
          sx={{ height: '4rem', columnGap: '2rem' }}
        >
          <Grid
            item
            md={4}
            sm={4}
            lg={4}
            xs={4}
            className="IntBorder  fs18px flex spaceBetween bRadius_8 p_l-r10px"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: "space-between",
            }}
          >
            <Typography className="fs16px g_color fontWeight700 ">
              {' '}
              Power
            </Typography>
            <Typography className="fs16px d_color fontWeight700 Transform_Capital">
              {isOnline ? 'Online' : 'Offline'}
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            sm={4}
            lg={4}
            xs={4}
            className="IntBorder  fs18px flex spaceBetween bRadius_8 p_l-r10px"
          >
            <Typography className="fs16px g_color fontWeight700 ">
              {' '}
              Wifi Strength
            </Typography>
            <BiWifi className="fs20px y_color fontWeight700 " />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Status;
