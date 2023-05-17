import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import NoData from '../.././assets/images/NoAlert.png';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
const Index = ({ data }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { gatewayName } = useParams();
  const [siteDetails, setSiteDetails] = useState([{}, {}]);
  useEffect(() => {
    console.log('}}}}}', data && data[0]?.branchManager);
    setSiteDetails(data && data[0]?.branchManager);
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
        style={{
          borderRadius: '8px 8px 0 0',
          justifyContent: 'space-between',
          height: '45px',
        }}
        className="d_bgcolor p10px "
      >
        <Typography className="fontWeight700 white_color fs18px">
          {/* {state ? state : "Branch Manager"} */}
          Branch Manager
        </Typography>
        <Button
          className=" white_color  fs16px fontWeight700   Transform_Capital "
          sx={{ padding: '0px' }}
          onClick={() => {
            navigate('/user/site-management');
          }}
        >
          See all
        </Button>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ border: "1px solid black" }}
        className=" THead_bgcolor fs16px g_color p_t-b10px "
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
          <Grid item xs={8} sm={8} md={8} lg={8}>
            <Typography className="fs16px fontWeight700">
              Branch Manager Name{' '}
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
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="  fs16px fontWeight700  ">
              Device{' '}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
            <Typography className="fs16px fontWeight700">Alerts</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexEnd">
            <Typography className="fs16px p_r10px fontWeight700 ">
              Action
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {siteDetails && siteDetails.length > 0 ? (
        siteDetails?.map((a, i) => (
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            key={i}
            // sx={{ border: "1px solid black" }}
            className=" fs16px  p_t-b10px border  mb20px "
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
                  {a?.branchID}
                </Typography>
              </Grid>
              <Grid item xs={8} sm={8} md={4} lg={4}>
                <Typography className="fs16px fontWeight700 Transform_Capital">
                  {a?.branchName}
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
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                <Typography className="  fs16px fontWeight700  ">
                  {a?.nodes?.length}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="flex center">
                <Typography className="fs16px fontWeight700">
                  {' '}
                  {a.Alert ? a.Alert : 0}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flex flexEnd  p_l-r10px"
              >
                <Button
                  onClick={() =>
                    navigate(`/admin/site-management/${gatewayName}/${a._id} `)
                  }
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
