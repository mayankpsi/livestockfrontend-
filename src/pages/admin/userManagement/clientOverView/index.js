import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Breadcrumbs,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";

import AdminUIContainer from "../../../../layout/AdminUIContainer";
import Overview from "./components/overview";
import Site from "./components/device";
import Livestock from "../../../../components/Admin/livestockManageTable";
import { adminRequest } from "../../../../requestMethod";
import { useLoaderController, setLoader } from "../../../../context/common";

// import Recommendation from "../../../components/device/recommend";

// import Alert from "../../../components/device/alerts";
// import AlertTable from "../../../components/Common/alertTable";
// import Status from "../../../components/device/status";

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
  const { id } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [value, setValue] = useState(0);
  const [userDetails, setUserDetails] = useState();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const UserDetails = async () => {
    try {
      const res = await adminRequest.get(`/user/getClientDetails/${id}`);
      console.log("userdetails,userdetails ", res);
      setLoader(dispatch, true);
      if (res.status == 200 || res.status == 201) {
        setLoader(dispatch, false);
        setUserDetails(res.data.data);
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    UserDetails();
  }, [id]);
  // useEffect(() => {
  //   UserDetails();
  // }, [state]);

  return (
    <>
      <AdminUIContainer>
        <Grid
          container
          alignItems="center"
          style={{ height: "50px", width: "100%" }}
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
                  to="/admin/user-management"
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold Transform_Capital ">
                    User Management
                  </Typography>
                </Link>
                ,
                <Link
                  to={`/admin/user-management/${id}`}
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold Transform_Capital ">
                    {userDetails && userDetails[0]?.clientName}
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
          </Container>
        </Grid>

        <Container maxWidth="lg">
          <Grid
            container
            className="flex spaceBetween mt10px "
            // sx={{ border: "2px solid red" }}
          >
            <Typography className="fs16px fontWeight700 Transform_Capital ">
              {userDetails && userDetails[0]?.clientName}
            </Typography>
            {/* {value == 0 && (
              <Button className="fs14px Greenborder d_color Transform_Capital fontWeight700  p_l-r10-30px  mb10px">
                Edit
              </Button>
            )} */}
          </Grid>

          <Grid
            container
            justifyContent="center"
            className="device-container mb20px mt10px "
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
                  className="TabChangesDevice1 Transform_Capital  fs16px bold"
                />

                <Tab
                  label="Devices"
                  className="TabChangesDevice1 Transform_Capital fs16px bold bRadius_8"
                />
                <Tab
                  label="Livestock"
                  className="TabChangesDevice1 Transform_Capital fs16px bold bRadius_8"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              {userDetails && (
                <Overview
                  title="Device Details"
                  data={userDetails && userDetails}
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {/* {value == 1 && navigate("/order")} */}
              <Site data={userDetails && userDetails} reRender={UserDetails} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              {/* {value == 1 && navigate("/order")} */}
              <Livestock
                data={userDetails && userDetails}
                reRender={UserDetails}
              />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default Index;
