import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
} from '@mui/material';

import AdminUI from '../../../layout/AdminUI';
import TableHead from '../../../components/Common/detailTable2';
import { adminRequest } from '../../../requestMethod';

import CustomizedTables from '../../../components/Admin/CustomizedTables';
const SiteManagement = () => {
  const navigate = useNavigate();
  const [GatewayDetails, setGatewayDetails] = useState([]);
  const [branchManager, setBranchManager] = useState([]);

  const getUserDetails = async () => {
    let userId = localStorage.getItem('agro_id');
    try {
      const res = await adminRequest.get(
        `/user/getGatewayByClientId/${userId}`
      );
      console.log(' user ------details', res);
      if (res.status == 200) {
        setGatewayDetails(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <AdminUI>
        <Grid
          container
          alignItems="center"
          style={{ height: '80px', width: '100%' }}
          className="d_bgcolor "
        >
          <Container maxWidth="lg">
            <Grid
              container
              direction="row"
              justifyContent="start"
              //   alignItems="center"
            >
              <Breadcrumbs
                separator="›"
                aria-label="breadcrumb"
                className=" white_color fs16px bold "
              >
                <Link
                  to="/user/dashboard"
                  className="white_color textDecorNone"
                  key="1"
                >
                  <Typography className="white_color fs16px bold ">
                    Dashboard
                  </Typography>
                </Link>
                ,
                <Link
                  to="/user/site-management"
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    Site management
                  </Typography>
                </Link>
                ,
              </Breadcrumbs>
            </Grid>
          </Container>
        </Grid>
        <Container maxWidth="lg" className=" mb30px mt20px ">
          <Grid container className="fs20px mb10px fontWeight700 d_color  ">
            All Sites({GatewayDetails && GatewayDetails?.length}){' '}
          </Grid>
          <TableHead
            className=" mt10px "
            data={GatewayDetails && GatewayDetails}
          />
        </Container>
      </AdminUI>
    </>
  );
};

export default SiteManagement;
