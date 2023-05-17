import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
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
import Overview from "../../../components/branchManager/overview";
import Device from "../../../components/branchManager/devices";
import Analytics from "../../../components/branchManager/analytics";
import AlertTable from "../../../components/Common/alertTable";
import Status from "../../../components/branchManager/status";

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
  const { gatewayName, branchName } = useParams();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [value, setValue] = useState(0);
  const [BMDetail, setBMDetail] = useState([]);
  const [nodeDetails, setNodeDetails] = useState([]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const getAllData = async () => {
    setLoader(dispatch, true);
    let URL1 = `/site/getBMDetails/${branchName}`;
    let URL2 = `/site/getNodesDetailsByBranchId/${branchName}`;

    const promise1 = adminRequest.get(URL1);
    const promise2 = adminRequest.get(URL2);

    let res = await Promise.all([promise1, promise2]);
    console.log("response of Bzm", res);
    setLoader(dispatch, false);
    if (res.length > 0) {
      setBMDetail(res[0].data.data);
      setNodeDetails(res[1].data.data);
    }
    // setLoader(dispatch, false);
  };

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props]);

  useEffect(() => {
    getAllData();
  }, [branchName]);
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
              </Breadcrumbs>
            </Grid>
            <Typography
              className="fs20px white_color  fontWeight600 mt20px"
              //   style={{ border: "1px solid red" }}
            >
              {" "}
              Branch Manager 1
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
                  label="Devices"
                  className="TabChangesDevice Transform_Capital fs16px bold"
                />
                <Tab
                  label="Alerts"
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
                title="Branch Manager Details"
                data={BMDetail && [BMDetail]}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Analytics data={[BMDetail]} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Device data={nodeDetails && nodeDetails} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AlertTable />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Status />
            </TabPanel>
          </Grid>
        </Container>
      </AdminUI>
    </>
  );
};

export default Index;
