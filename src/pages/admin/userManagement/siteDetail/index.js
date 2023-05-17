import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
// import AdminUIContainer from "../../../../layout/AdminUIContainer";
// import Overview from "./components/overview";
// import Site from "../clientOverView/components/site";

// import Recommendation from "../../../components/device/recommend";
import Overview from '../../../../components/gatewayDetail/overview';
import Device from '../../../../components/branchManager/devices';
import { BsArrowLeftShort } from 'react-icons/bs';
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

const Index = ({ showDetail, data }) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // if (props.value) setValue(props.value);
    console.log('>>JJJJK', data[0]?.gateway);
  }, []);
  return (
    <>
      <Grid
        container
        // alignItems="center"
        style={{
          height: '70px',
          width: '100%',
          borderRadius: '10px',
          paddingTop: '15px',
        }}
        className="d_bgcolor "
      >
        <Container>
          <Grid
            container
            direction="row"
            justifyContent="start"
            //   alignItems="center"
          >
            <Grid
              className=" flex fs20px  fontWeight700 white_color center "
              onClick={() => showDetail(false)}
            >
              <BsArrowLeftShort className="fs20px " />
              back
            </Grid>
            {/* <Breadcrumbs
              separator="›"
              aria-label="breadcrumb"
              className=" white_color fs16px bold "
            >
              <Link to="/user/dashboard" className="white_color" key="1">
                <Typography className="white_color fs16px bold ">
                  Dashboard
                </Typography>
              </Link>
            </Breadcrumbs> */}
          </Grid>
        </Container>
      </Grid>

      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          className="device-container"
          sx={{
            marginTop: '-2rem',
            marginBottom: '2rem',
          }}
        >
          <Grid item sx={{ width: '100%' }}>
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
                label="Branch Managers"
                className="TabChangesDevice Transform_Capital fs16px bold bRadius_8"
              />
              <Tab
                label="Status"
                className="TabChangesDevice Transform_Capital fs16px bold bRadius_8"
              />
            </Tabs>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <TabPanel value={value} index={0}>
            <Overview
              title="Gateway Details"
              data={data && data[0]?.gateway}
              apiEndpoint="/site/updatesite"
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* {value == 1 && navigate("/order")} */}
            {/* <Site /> */}
          </TabPanel>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
