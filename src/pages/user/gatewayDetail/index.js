import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import AdminUI from '../../../layout/AdminUI';
import Overview from '../../../components/gatewayDetail/overview';
import BranchManager from '../../../components/gatewayDetail/branchManager';
import Analytics from '../../../components/gatewayDetail/analytics';
import Status from '../../../components/gatewayDetail/status';
import { adminRequest } from '../../../requestMethod';
import { setLoader, useLoaderController } from '../../../context/common';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children} </div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Index = (props) => {
  const navigate = useNavigate();
  const { gatewayName } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();
  const [value, setValue] = useState(0);
  const [GatewayDetails, setGatewayDetails] = useState([]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getBGatewayDetail = async () => {
    let userId = localStorage.getItem('agro_id');
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(`/site/gatewaydetails/${gatewayName}`);
      console.log(' gatewayName details', res);
      if (res.status == 200) {
        setLoader(dispatch, false);
        setGatewayDetails([res?.data?.data]);
      }
    } catch (err) {
      console.log(err);
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: 'error',
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props]);
  useEffect(() => {
    getBGatewayDetail();
  }, []);

  return (
    <>
      <AdminUI>
        <Grid
          container
          alignItems="center"
          style={{ height: '140px', width: '100%' }}
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
                <Link
                  to={`/user/site-management/land-1`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    Farm land 1
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Typography
              className="fs24px white_color  fontWeight600 mt20px"
              //   style={{ border: "1px solid red" }}
            >
              {' '}
              Farm Land 1
            </Typography>
          </Container>
        </Grid>

        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="center"
            className="device-container"
            sx={{ marginTop: '-22px', marginBottom: '20px' }}
          >
            <Grid item sx={{ width: '100%' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                className="TabStyleAddDevice bRadius_8"
              >
                <Tab
                  label="Overview"
                  className="TabChangesDevice Transform_Capital  fs16px bold"
                />
                <Tab
                  label="Analytics"
                  className="TabChangesDevice Transform_Capital fs16px bold bRadius_8"
                />
                <Tab
                  label="Branch Manager"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label="Status"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              <Overview
                title="Gateway Details"
                data={
                  GatewayDetails && GatewayDetails?.length > 0 && GatewayDetails
                }
                // apiEndpoint="/site/updatesite"
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Analytics />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <BranchManager
                data={
                  GatewayDetails &&
                  GatewayDetails.length > 0 &&
                  GatewayDetails[0].branchManager
                }
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Status />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUI>
    </>
  );
};

export default Index;
