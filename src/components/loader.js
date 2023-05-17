import React from 'react';
import { Grid } from '@mui/material';

const loader = () => {
  return (
    <Grid
      sx={{
        backgroundColor: 'rgba(0, 128, 0, 0.188)',
        position: 'fixed',
        zIndex: 1000,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <span className="loader"></span>
    </Grid>
  );
};

export default loader;
