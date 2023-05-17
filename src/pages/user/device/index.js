import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import AdminUI from "../../../layout/AdminUI";
import Overview from "../../../components/device/overview";
import Recommendation from "../../../components/device/recommend";
import Analytics from "../../../components/device/analytics";
import Alert from "../../../components/device/alerts";
import AlertTable from "../../../components/Common/alertTable";
// import Status from "../../../components/device/status";
import { adminRequest } from "../../../requestMethod";
import { setLoader, useLoaderController } from "../../../context/common";

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
  const { gatewayName, branchName, deviceId } = useParams();

  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [details, setDetails] = useState();
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  // setLoader(dispatch, true);  enqueueSnackbar(err.response.data.msg, {
  //   variant: "error",
  //   autoHideDuration: 3000,
  // });

  const getNodeDetails = async () => {
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(
        `/site/getNodeDetailsByNodeId/${deviceId}`
      );
      if (res.status == 200) {
        setLoader(dispatch, false);
        setDetails([res?.data?.data]);
        // setSiteDetails(res?.data?.data?.branchManager);
      } else {
        setLoader(dispatch, false);
        console.log("error ");
      }
    } catch (err) {
      setLoader(dispatch, false);

      console.log("error in getNodeDetails", err);
    }
  };

  useEffect(() => {
    if (props.value) setValue(props.value);
    getNodeDetails();
  }, [props]);

  useEffect(() => {
    getNodeDetails();
  }, []);
  return (
    <>
      <AdminUI>
        <Grid
          container
          alignItems="center"
          style={{ height: "140px", width: "100%" }}
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
                  to={`/user/site-management/${gatewayName}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    Farm land 1
                  </Typography>
                </Link>
                ,
                <Link
                  to={`/user/site-management/${gatewayName}/${branchName}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    branchmanager1
                  </Typography>
                </Link>
                ,
                <Link
                  to={`/user/site-management/${gatewayName}/${branchName}/${deviceId}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    device1
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Typography
              className="fs24px white_color  fontWeight600 mt20px"
              //   style={{ border: "1px solid red" }}
            >
              {" "}
              Device 1
            </Typography>
          </Container>
        </Grid>

        <Container maxWidth="lg">
          <Grid
            container
            justifyContent="center"
            className="device-container"
            sx={{ marginTop: "-22px", marginBottom: "20px" }}
          >
            <Grid item sx={{ width: "100%" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                centered
                className="TabStyleAddDevice bRadius_8"
                // variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
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
                  label="Recommendation"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label="Alerts"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label=" Device Status"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              <Overview title="Device Details" data={details && details} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* {value == 1 && navigate("/order")} */}
              <Analytics data={details && details} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Recommendation />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AlertTable />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Alert data={details && details} />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUI>
    </>
  );
};

export default Index;
