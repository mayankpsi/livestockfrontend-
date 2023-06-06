import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import AdminUIContainer from "../../../../layout/AdminUIContainer";
import Overview from "../livestockOverview/components/overview";
// import BranchManager from "../../../../components/gatewayDetail/branchManager";
// import Location from "../../../../components/deviceDetail/analytics";
import Health from "../livestockOverview/components/health";
import Activity from "../livestockOverview/components/activity";
import Devices from "../livestockOverview/components/device";

// import Status from "../../../../components/gatewayDetail/status";
import { adminRequest } from "../../../../requestMethod";
import { setLoader, useLoaderController } from "../../../../context/common";

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
  const { livestockID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [value, setValue] = useState(0);
  const [details, setDetails] = useState();
  const [branchDetail, setbranchDetail] = useState();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const getLiveStockDetail = async () => {
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(
        `/liveStock/getLiveStockByID?liveStockID=${livestockID}`
      );
      console.log("res>> liveStock file", res?.data?.data);
      if (res.status == 200) {
        setLoader(dispatch, false);
        setDetails(res?.data?.data);
      } else {
        console.log("error ");
      }
    } catch (err) {
      console.log("error get site members", err);
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    // if (props.value) setValue(props.value);
    getLiveStockDetail();
  }, []);

  return (
    <>
      <AdminUIContainer>
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
                  to="/admin/dashboard"
                  className="white_color textDecorNone"
                  key="1"
                >
                  <Typography className="white_color fs16px bold ">
                    Dashboard
                  </Typography>
                </Link>
                ,
                <Link
                  to="/admin/livestock"
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    Live Stock
                  </Typography>
                </Link>
                ,
                <Link
                  to={`/admin/livestock/${livestockID}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    {details && details?.name}
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Typography
              className="fs24px white_color  fontWeight600 mt20px"
              // style={{ border: "1px solid red" }}
            >
              {details && details?.name}
              {/* Farm Land 1 */}
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
                centered
                value={value}
                onChange={handleChange}
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
                  label="Location"
                  className="TabChangesDevice Transform_Capital fs16px bold bRadius_8"
                />
                <Tab
                  label="Health"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label="Activity"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label="Device"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              <Overview
                title="Gateway Details"
                data={details && details}
                apiEndpoint={`/liveStock/update?liveStockID=${livestockID}`}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* <Location /> */}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* <BranchManager
                data={siteDetails && siteDetails}
                address={address}
              /> */}
              <Health data={branchDetail} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Activity />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Devices data={details && details} />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default Index;
