import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Tabs,
  Tab,
  Container,
  Grid,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import DeviceTable from "../../../components/Admin/DeviceTable";
import { adminRequest } from "../../../requestMethod";
import { useLoaderController, setLoader } from "../../../context/common";

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
// siteManagement first page
const Index = () => {
  const navigate = useNavigate();
  const [deviceDetails, setDeviceDetails] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState(false);

  const getSite = async () => {
    // let ID = localStorage.getItem('agro_id');
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(`/devices/getAll?status=${status}`);
      setLoader(dispatch, false);
      // console.log(res);
      if (res.status == 200) {
        setDeviceDetails(res?.data?.data);
      }
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err?.response?.data?.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getSite();
  }, []);
  return (
    <>
      <AdminUIContainer>
        {/* <> */}
        <Grid
          container
          alignItems="center"
          style={{ height: "80px", width: "100%" }}
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
                  className="white_color textDecorNone "
                  key="1"
                >
                  <Typography className="white_color fs16px bold Transform_Capital ">
                    Dashboard
                  </Typography>
                </Link>
                ,
                <Link
                  to="/admin/device-management"
                  className="white_color textDecorNone"
                  key="2"
                >
                  <Typography className="white_color fs16px bold Transform_Capital ">
                    Devices
                  </Typography>
                </Link>
                ,
              </Breadcrumbs>
            </Grid>
          </Container>
        </Grid>

        <Container maxWidth="lg" className=" mb30px mt20px ">
          <Grid
            container
            className="fs20px spaceBetween  mb30px fontWeight700 d_color  "
            // style={{ border: "1px solid blue" }}
          >
            <Typography className="fs20px  fontWeight700 d_color  ">
              All Devices ({deviceDetails && deviceDetails?.length})
            </Typography>

            {/* <Button
                className="fs16px  fontWeight600 d_color Greenborder p_l-r30px"
                onClick={() => {
                  navigate("/admin/device-management/add-site-management");
                }}
              >
                Add
              </Button> */}
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
                  label="Assigned"
                  className="TabChangesDevice1 Transform_Capital  fs16px bold"
                />

                <Tab
                  label="idle"
                  className="TabChangesDevice1 Transform_Capital fs16px bold bRadius_8"
                />
              </Tabs>
            </Grid>
          </Grid>

          <Grid item md={12}>
            <TabPanel value={value} index={0}>
              {deviceDetails && (
                <DeviceTable
                  className=" mt30px "
                  data={deviceDetails}
                  reRander={getSite}
                />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <DeviceTable
                className=" mt30px "
                data={deviceDetails && deviceDetails}
                reRander={getSite}
              />
            </TabPanel>
          </Grid>

          {/* <SiteManageTable
              className=" mt30px "
              data={siteDetails}
              reRander={getSite}
            /> */}
        </Container>
        {/* </> */}
      </AdminUIContainer>
    </>
  );
};

export default Index;
