import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

// import Header from "../../components/Header";
import AdminUI from "../../layout/AdminUI";
import CustomizedTables from "../../components/Admin/CustomizedTables";
import DashboardCard from "../../components/DashboardCard";
import DummyMap from "../../assets/images/Dummy.png";
import BM from "../../assets/images/bm.png";
import Gatway from "../../assets/images/Gateway.png";
import NoData from "../../assets/images/NoAlert.png";

import TableHead from "../../components/User/BranchManagerTable";
import { Navigate } from "react-router-dom";
import { adminRequest } from "../../requestMethod";
import { setLoader, useLoaderController } from "../../context/common";

const DashBoard = () => {
  const navigate = useNavigate();
  const [controller, dispatch] = useLoaderController();
  const { enqueueSnackbar } = useSnackbar();

  const [siteDetails, setSiteDetails] = useState();
  const [UserDetails, setUserDetails] = useState([]);
  const [branchManager, setBranchManager] = useState([]);

  const getUserDetails = async () => {
    let userId = localStorage.getItem("agro_id");
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.get(`/user/getClientDetails/${userId}`);
      console.log(" user details", res);
      if (res.status == 200 || res.status == 201) {
        setLoader(dispatch, false);
        setUserDetails(res.data.data[0]);
        let BmDetail = [];
        res?.data?.data[0]?.gateway?.map((item) => {
          BmDetail = [...BmDetail, ...item?.branchManager];
        });
        // console.log('>>', BmDetail);/
        setBranchManager(BmDetail);
      }
    } catch (err) {
      console.log(err);
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <AdminUI>
        <Grid
          style={{ height: "140px", width: "100%", backgroundColor: "#347D00" }}
        >
          <Container
            maxWidth="lg"
            // sx={{ border: "3px solid green", padding: "10px 0" }}
          >
            <Typography
              className="fs24px bold white_color"
              // variant="h4"
              sx={{ paddingTop: "2.5rem" }}
            >
              Dashboard
            </Typography>
          </Container>
        </Grid>

        <Container maxWidth="lg" className=" mb30px ">
          <Grid container item sx={{ marginTop: "-7vh" }}>
            <Grid
              container
              style={{
                display: "flex",
                flexDirection: "row",
                rowGap: "10px",
                columnGap: "10px",
              }}
            >
              <Grid
                item
                sm={2.9}
                md={2.9}
                xs={2.9}
                lg={2.9}
                className="dashboardCard"
              >
                <Grid className="txtDiv">
                  <Grid item className=" ">
                    <Typography className="CardText fs16px fontWeight700">
                      Gateway
                    </Typography>
                    <Typography className="b1c_color fontWeight700 fs24px">
                      {UserDetails?.gateway?.length}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className="imageDiv">
                  <img
                    src={Gatway}
                    style={{ width: "32px", height: "32px" }}
                    alt="error"
                  />
                </Grid>
              </Grid>
              <Grid
                item
                sm={2.9}
                md={2.9}
                xs={2.9}
                lg={2.9}
                className="dashboardCard"
              >
                <Grid className="txtDiv">
                  <Grid>
                    <Typography className="CardText fs16px fontWeight700">
                      BranchManager
                    </Typography>
                    <Typography className="b1c_color fontWeight700 fs24px">
                      {branchManager && branchManager.length}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid className="imageDiv">
                  <img
                    src={BM}
                    style={{ width: "32px", height: "32px" }}
                    alt="error"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            style={{ columnGap: "10px", rowGap: "20px" }}
            className="mt10px flex"
          >
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              // style={{ border: "1px solid #ddd" }}
              className=" bRadius_8-2 border "
            >
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{
                  height: "45px",
                }}
                className="d_bgcolor p10px bRadius_8-2  spaceBetween1 "
              >
                <Typography className="fontWeight700 white_color fs18px">
                  Alerts
                </Typography>
                <Button
                  className=" white_color  fs16px fontWeight700   Transform_Capital "
                  sx={{ padding: "0px" }}
                  onClick={() => {
                    navigate("/user/site-management");
                  }}
                >
                  See all
                </Button>
              </Grid>
              <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                // sx={{ border: "1px solid black" }}
                className=" THead_bgcolor fs16px g_color p_t-b10px "
              >
                <Grid
                  container
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  lg={4}
                  // sx={{ border: "1px solid red" }}
                >
                  <Grid item xs={8} sm={8} md={8} lg={8}>
                    <Typography className="fs16px fontWeight700 ml5px">
                      Alert Name
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  item
                  xs={8}
                  sm={8}
                  md={8}
                  lg={8}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  // sx={{ border: "1px solid blue", display: "flex" }}
                  className="flex flex-end"
                >
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    className="flex center"
                  >
                    <Typography className="fs16px fontWeight700">
                      DeviceName
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    lg={4}
                    className="flex flexEnd "
                  >
                    <Typography className="fs16px p_r10px fontWeight700 ">
                      Action
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {siteDetails && siteDetails.length > 0 ? (
                siteDetails.map((a, i) => (
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    // sx={{ border: "1px solid black" }}
                    className=" fs16px  p_t-b10px border  mb20px "
                  >
                    <Grid
                      container
                      item
                      xs={4}
                      sm={4}
                      md={4}
                      lg={4}
                      // sx={{ border: "1px solid red" }}
                    >
                      <Grid item xs={8} sm={8} md={4} lg={4}>
                        <Typography className="fs16px fontWeight700 Transform_Capital ml5px">
                          {a.siteName}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={8}
                      sm={8}
                      md={8}
                      lg={8}
                      justifyContent="flex-end"
                      alignItems="flex-end"
                      // sx={{ border: "1px solid blue", display: "flex" }}
                      className="flex flex-end"
                    >
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        className="flex center"
                      >
                        <Typography className="fs16px fontWeight700">
                          {" "}
                          {a.Alert}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        sm={4}
                        md={4}
                        lg={4}
                        className="flex flexEnd  p_l-r10px"
                      >
                        <Button
                          onClick={() => navigate(`/user/site-management `)}
                          style={{ padding: "0px" }}
                          className=" fs16px d_color fontWeight700 Transform_Capital"
                        >
                          View
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ height: "200px" }}
                >
                  <Grid
                    container
                    item
                    alignItems="center"
                    sx={{ flexDirection: "column" }}
                  >
                    <img src={NoData} alt="loading" height="100px" />
                    <Typography className="fs20px mt10px d_color fontWeight700 ">
                      No Data Found
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid item lg={5.8} md={5.8} sm={12} xs={12}>
              <img
                src={DummyMap}
                alt="nothing"
                style={{ height: "200 !important", width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid
            conatiner
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            className="mt20px"
          >
            <TableHead state={"site"} data={branchManager && branchManager} />
          </Grid>
        </Container>
      </AdminUI>
    </>
  );
};

export default DashBoard;
