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
import AdminUIContainer from "../../../../layout/AdminUIContainer";
import Overview from "../livestockOverview/components/overview";
// import BranchManager from "../../../../components/gatewayDetail/branchManager";
import Analytics from "../../../../components/gatewayDetail/analytics";
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
  const { gatewayName } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [value, setValue] = useState(0);
  const [siteDetails, setSiteDetails] = useState([]);
  const [details, setDetails] = useState();
  const [address, setAddress] = useState({});
  const [branchDetail, setBranchDetail] = useState([]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  //   const getDetail = async () => {
  //     let ID = localStorage.getItem("agro_id");
  //     setLoader(dispatch, true);
  //     try {
  //       const res = await adminRequest.get(`/site/gatewaydetails/${gatewayName}`);
  //       console.log("res>> overviewindex file", res?.data?.data);
  //       if (res.status == 200) {
  //         setLoader(dispatch, false);
  //         setDetails([res?.data?.data]);
  //         setSiteDetails(res?.data?.data?.branchManager);
  //         setBranchDetail(res?.data?.data?.branchManager);
  //         setAddress({
  //           gatewayPincode: res?.data?.data?.gatewayPincode,
  //           gatewayCity: res?.data?.data?.gatewayCity,
  //           gatewayState: res?.data?.data?.gatewayState,
  //           gatewayCountry: res?.data?.data?.gatewayCountry,
  //         });
  //       } else {
  //         console.log("error ");
  //       }
  //     } catch (err) {
  //       console.log("error get site members", err);
  //       setLoader(dispatch, false);
  //       enqueueSnackbar(err?.response?.data?.msg, {
  //         variant: "error",
  //         autoHideDuration: 3000,
  //       });
  //     }
  //   };

  //   useEffect(() => {
  //     if (props.value) setValue(props.value);
  //     getDetail();
  //   }, [props, value]);

  useEffect(() => {
    // console.log(details?.gatewayName, "gatewayNmae");
    // console.log(details[0].gatewayName);
  }, [details]);
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
                  to={`/admin/site-management/${gatewayName}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    {details && details[0]?.gatewayName}
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
            <Typography
              className="fs24px white_color  fontWeight600 mt20px"
              // style={{ border: "1px solid red" }}
            >
              {details && details[0]?.gatewayName}
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
                apiEndpoint="/site/updatesite"
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Analytics />
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
              <Devices />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default Index;
