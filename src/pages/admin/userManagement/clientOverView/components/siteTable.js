import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { MdDeleteOutline, MdOutlineRemoveRedEye } from 'react-icons/md';
import Add from '../../../../../assets/images/AddSite.png';
import AddSite_fromUser from '../../../../../components/Admin/AddSite_fromAddUser.js';
import DeletePopup from '../../../../../components/DeletePopupCard.js';

const Index = ({ showDetail, data, reRander }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [siteDetails, setSiteDetails] = useState([
    {
      id: 1,
      siteName: 'gdhsgadh',
      bmName: 'gdhsgadh',
      deviceName: 1,
      alert: 4,
    },
  ]);
  useEffect(() => {
    setSiteDetails(data && data.length > 0 && data[0].gateway);
    console.log('>>>??lll', data);
  }, [data]);
  return (
    <>
      <Grid container>
        <Grid container className="flex flexEnd">
          <AddSite_fromUser
            Name={'site'}
            gatewayID={data && data.length > 0 && data[0]?._id}
            reRander={reRander}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          // sx={{ border: "1px solid black" }}
          className=" d_bgcolor fs16px white_color  p_t-b10px bRadius_8-2 "
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
            <Grid item xs={6} sm={6} md={6} lg={6}>
              <Typography className="fs16px fontWeight700">
                Device Name{' '}
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
            {/* <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexEnd">
            <Typography className="  fs16px fontWeight700  ">
              Branch Manager{" "}
            </Typography>
          </Grid> */}
            <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
              <Typography className="  fs16px fontWeight700  ">
                Assigned
              </Typography>
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} className="flex center">
              <Typography className="fs16px fontWeight700">
                Device Status
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              className="flex flexEnd  p_r30px"
            >
              <Typography className="fs16px p_r10px fontWeight700 ">
                Action
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {siteDetails && siteDetails.length > 0 ? (
          siteDetails.map((a, i) => {
            let nodeLength = 0;
            a?.branchManager?.map((item) => {
              nodeLength += item?.nodes?.length;
            });
            return (
              <>
                <Grid
                  key={i}
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  // sx={{ border: "1px solid black" }}
                  className="  fs16px  border  p_t-b10px "
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
                      <Typography className="  fs16px  p_l-r10px fontWeight700 d_color Transform_Capital">
                        {a?.gatewayID}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <Typography className="fs16px fontWeight700 d_color Transform_Capital ">
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
                    {/* <Grid item xs={3} sm={3} md={3} lg={3} className="flex flexEnd">
                <Typography className="  fs16px fontWeight700  ">
                  Branch Manager{" "}
                </Typography>
              </Grid>*/}
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      className="flex center"
                    >
                      <Typography className="  fs16px fontWeight700  ">
                        {nodeLength}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      sm={3}
                      md={3}
                      lg={3}
                      className="flex center"
                    >
                      <Typography className="fs16px fontWeight700 Red_color ">
                        {a?.alert ? a?.alert : 0}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sm={2}
                      md={2}
                      lg={2}
                      className="flex center p_r10px"
                    >
                      {/* <Stack direction="row" alignItems="center" spacing={2}> */}
                      <MdOutlineRemoveRedEye
                        className="fs24px "
                        onClick={() => showDetail(true)}
                      />

                      <DeletePopup Name={'site from the user'} id={a?._id} />
                      {/* </Stack> */}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })
        ) : (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: '400px' }}
            className=" border "
          >
            <Grid
              container
              item
              alignItems="center"
              sx={{ flexDirection: 'column', width: '20%' }}
              className="Greenborder  bRadius_8 Cursor"
              onClick={() => {
                // navigate("/admin/device-management/add-site-management");
              }}
            >
              <img src={Add} alt="loading" className="M20" />
              <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
                Add Site
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Index;
