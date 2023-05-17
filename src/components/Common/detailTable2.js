import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import NoData from '../.././assets/images/NoAlert.png';
const Index = ({ data }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [siteDetails, setSiteDetails] = useState([]);
  useEffect(() => {
    setSiteDetails(data && data);
  }, [data]);
  return (
    <>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ border: "1px solid black" }}
        className=" d_bgcolor fs16px white_color  p_t-b10px "
      >
        <Grid
          container
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          // sx={{ border: "1px solid red" }}
        >
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography className="  fs16px  p_l-r10px fontWeight700">
              UID{' '}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4}>
            <Typography className="fs16px fontWeight700">Site Name </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          justifyContent="flex-end"
          alignItems="flex-end"
          // sx={{ border: "1px solid blue", display: "flex" }}
          className="flex flex-end"
        >
          <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
            <Typography className="  fs16px fontWeight700  ">
              Branch Manager{' '}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="  fs16px fontWeight700  ">
              Device{' '}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="fs16px fontWeight700">Alerts</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
            <Typography className="fs16px p_r10px fontWeight700 ">
              Action
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      {siteDetails && siteDetails.length > 0 ? (
        siteDetails.map((a, i) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            // sx={{ border: "1px solid black" }}
            className=" border fs16px b1cpx p_t-b10px "
          >
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              // sx={{ border: "1px solid red" }}
            >
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography className="  fs16px  p_l-r10px fontWeight700">
                  {a?.gatewayID}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Typography className="fs16px fontWeight700">
                  {a?.gatewayName}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={8}
              sm={8}
              md={8}
              lg={8}
              justifyContent="flex-end"
              alignItems="flex-end"
              // sx={{ border: "1px solid blue", display: "flex" }}
              className="flex flex-end"
            >
              <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
                <Typography className="  fs16px fontWeight700  ">
                  {a?.branchManager?.length}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                <Typography className="  fs16px fontWeight700  ">
                  {a?.Devices}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                <Typography className="fs16px Red_color fontWeight700">
                  {a?.Alert? a?.Alert:0}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex flexEnd">
                <Button
                  onClick={() => navigate(`/user/site-management/${a?._id}`)}
                  style={{ padding: '0px' }}
                  className=" fs16px d_color fontWeight700 Transform_Capital"
                >
                  View
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: '400px' }}
        >
          <Grid
            container
            item
            alignItems="center"
            sx={{ flexDirection: 'column' }}
          >
            <img src={NoData} alt="loading" height="200px" />
            <Typography className="fs20px mt10px d_color fontWeight700 ">
              No Data Found
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Index;
