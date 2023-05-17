import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import AdminUI from "../../../layout/AdminUI";
import Overview from "../../../components/User/Setting/profile";
import Security from "../../../components/User/Setting/security";
import Notification from "../../../components/User/Setting/notification";

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

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props]);
  return (
    <>
      <AdminUI>
        <Grid
          container
          alignItems="center"
          style={{ height: "100px", width: "100%" }}
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
                  className="white_color textDecorNone "
                  key="1"
                >
                  <Typography className="white_color fs16px bold ">
                    Dashboard
                  </Typography>
                </Link>
                ,
                <Link
                  to="/user/settings"
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold ">
                    Settings
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Grid>
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
              >
                <Tab
                  label="Profile"
                  className="TabChangesDevice Transform_Capital  fs16px bold"
                />
                <Tab
                  label="Security"
                  className="TabChangesDevice Transform_Capital fs16px bold bRadius_8"
                />
                <Tab
                  label="Notifications"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              <Overview title="Personal Details" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Security />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Notification />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUI>
    </>
  );
};

export default Index;
