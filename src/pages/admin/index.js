import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, Button, Typography } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";

import { useSnackbar } from "notistack";

import Loader from "../../components/loader";

import AdminUIContainer from "../../layout/AdminUIContainer";
import DashboardCard from "../../components/DashboardCard";

import ClientImg from "../../assets/images/Client.png";
import GatewayImg from "../../assets/images/Gateway.png";
import DeviceImg from "../../assets/images/Device.png";
import BMImg from "../../assets/images/bm.png";
import Add from "../../assets/images/AddSite.png";

import { useLoaderController, setLoader } from "../../context/common";
import { adminRequest } from "../../requestMethod";
import {
  handleGetUser,
  handleGetLiveStock,
} from "../../store/Slices/dashboardSlice";

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [controller, dispatch] = useLoaderController();

  const [clientDetails, setClientDetails] = useState("");
  const [siteDetails, setSiteDetails] = useState("");
  const [totalBM, setTotalBM] = useState(0);
  const [totalNodes, setTotalNodes] = useState(0);
  let BM = 0;
  let nodeLength = 0;
  const data = [{}];

  const getAllData = async () => {
    try {
      setLoader(dispatch, true);

      let adminId = localStorage.getItem("agro_id");
      const promise1 = adminRequest.get("/user/getclients");
      const promise2 = adminRequest.get(`/site/getsite/${adminId}`);
      const res = await Promise.all([promise1, promise2]);
      if (res[0].status == 200 || res[0].status == 201) {
        setClientDetails(res[0].data.data);
      }
      if (res[1].status == 200 || res[1].status == 201) {
        setSiteDetails(res[1].data.data);

        let GD = res[1].data.data;
        let BMCount = 0;
        let NodeCount = 0;
        for (let i = 0; i < GD.length; i++) {
          let BMLength = GD[i].branchManager.length;
          BMCount = BMCount + BMLength;
          for (let j = 0; j < BMLength; j++) {
            NodeCount = NodeCount + GD[i].branchManager[j].nodes.length;
          }
        }
        setTotalBM(BMCount);
        setTotalNodes(NodeCount);
      }
      setLoader(dispatch, false);
    } catch (err) {
      setLoader(dispatch, false);
      enqueueSnackbar(err.response.data.msg, {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
  };

  // useEffect(() => {
  //   getAllData();
  // }, []);
  // useEffect(() => {
  //   console.log('nodeLengthnodeLength', nodeLength);
  // }, [nodeLength]);
  return (
    <>
      <AdminUIContainer>
        <Grid
          style={{
            height: "140px",
            width: "100%",
            backgroundCoaddLiveStocklor: "#B58B5D",
          }}
        >
          <Container maxWidth="lg">
            <Typography className="fs24px bold white_color p_t25px">
              Dashboard
            </Typography>
          </Container>
        </Grid>

        <Container maxWidth="lg">
          <Grid container item xs={12} sx={{ marginTop: "-7vh" }}>
            <Grid
              container
              item
              xs={12}
              className="flex"
              style={{
                flexDirection: "row",
                rowGap: "2rem",
                columnGap: "2rem",
              }}
            >
              <DashboardCard
                title="Total Devices"
                total={clientDetails && clientDetails?.length}
                img={ClientImg}
              />
              <DashboardCard
                title="Active Devices"
                total={siteDetails && siteDetails?.length}
                img={GatewayImg}
              />
              <DashboardCard
                title="Safe LiveStocks"
                total={totalBM}
                img={BMImg}
              />
              <DashboardCard
                title="UnSafe LiveStocks"
                total={totalNodes}
                img={DeviceImg}
              />
            </Grid>

            {data?.length > 0 ? (
              <>
                <Grid
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  style={{
                    justifyContent: "space-evenly",
                    columnGap: "1rem",
                    rowGap: "1rem",
                  }}
                  className="flex Width100 mt10px "
                >
                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={5.9}
                    lg={5.9}
                    sx={{ display: "block" }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className=" p10px bRadius_8-2 flex spaceBetween1 d_bgcolor "
                    >
                      <Grid
                        container
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        // sx={{ border: "2px solid red" }}
                        className="flexDir"
                      >
                        <Typography className="fontWeight700 white_color fs18px p_l-r5px">
                          Devices
                        </Typography>
                        <Grid item className="flex">
                          <Button
                            className="fontWeight600 white_color fs14px  Transform_Capital"
                            style={{ padding: "0px" }}
                            onClick={() => navigate("/admin/device-management")}
                          >
                            See all
                          </Button>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        className="flex centerJc Cursor"
                        // onClick={() =>
                        //   // navigate("/admin/device-management/add-site-management")
                        // }
                      >
                        <IoIosAddCircleOutline className="fs20px white_color " />
                        <Typography
                          className="fontWeight700 white_color fs14px ml5px"
                          onClick={() => navigate("/admin/device-management")}
                        >
                          Add Devices
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      // sx={{ border: "1px solid black" }}
                      className=" g_color fs16px   p_t-b10px border "
                    >
                      <Grid
                        container
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        // sx={{ border: "1px solid red" }}
                      >
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Typography className="  fs16px  fontWeight700 p_l-r18px">
                            UID
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Typography className="fs16px fontWeight700">
                            Name
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        // sx={{ border: "1px solid blue", display: "flex" }}
                        className="flex flex-end"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="flex center"
                        >
                          <Typography className="  fs16px fontWeight700  ">
                            Devices
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="flex flexEnd  p_r30px"
                        >
                          <Typography className="fs16px p_r10px fontWeight700 ">
                            Action
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justifyContent="center"
                      // alignItems="center"
                      sx={{
                        minHeight: "400px",
                        display: "block",
                        maxHeight: "400px",
                        overflow: "hidden",
                      }}
                      className=" border"
                    >
                      {siteDetails && siteDetails.length > 0 ? (
                        siteDetails.map((a, i) => {
                          a?.branchManager?.map((item) => {
                            nodeLength = item?.nodes?.length;
                          });
                          return (
                            <Grid
                              key={i}
                              container
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              // sx={{ height: '55px' }}
                              className="  fs16px  border"
                              sx={{ height: "55px" }}
                            >
                              <Grid container item xs={6} sm={6} md={6} lg={6}>
                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  className="AlignCenter flex  "
                                >
                                  <Typography
                                    className="  fs16px  p_l-r10px fontWeight700 b1c_color"
                                    // sx={{ border: '1px solid red' }}
                                  >
                                    {a?.gatewayID}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  className="AlignCenter flex "
                                >
                                  <Typography className="fs16px fontWeight700 b1c_color">
                                    {a?.gatewayName}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                justifyContent="flex-end"
                                className="flex flex-end"
                              >
                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  className="flex center"
                                >
                                  <Typography className="  fs16px fontWeight700 b1c_color ">
                                    {a?.branchManager?.length}
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xs={6}
                                  sm={6}
                                  md={6}
                                  lg={6}
                                  className="flex  center  "
                                  // sx={{ border: "1px solid red" }}
                                >
                                  <Button
                                    onClick={() =>
                                      navigate(
                                        `/admin/device-management/${a?._id}`
                                      )
                                    }
                                    style={{ padding: "0px" }}
                                    className=" fs16px d_color fontWeight700 Transform_Capital"
                                  >
                                    View
                                  </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })
                      ) : (
                        <Grid
                          container
                          item
                          alignItems="center"
                          sx={{
                            flexDirection: "column",
                            width: "40%",
                            margin: "0 auto",
                            marginTop: "100px",
                          }}
                          className=" Cursor"
                          onClick={() => {
                            navigate("/admin/device-management");
                          }}
                        >
                          <img src={Add} alt="loading" className="" />
                          <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
                            Add Devices
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={5.9}
                    lg={5.9}
                    sx={{ display: "block" }}
                  >
                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className=" flex spaceBetween1 bRadius_8-2 p10px  d_bgcolor"
                    >
                      <Grid
                        container
                        item
                        xs={8}
                        sm={8}
                        md={8}
                        lg={8}
                        // sx={{ border: "2px solid red" }}
                        className="flexDir"
                      >
                        <Typography className="fontWeight700 white_color fs18px p_l-r5px">
                          User
                        </Typography>
                        <Grid item className="flex ">
                          <Button
                            className="fontWeight600 white_color fs14px  Transform_Capital"
                            style={{ padding: "0px" }}
                            onClick={() => navigate("/admin/user-management")}
                          >
                            See all
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        className="flex  centerJc Cursor"
                        onClick={() => navigate("/admin/user-management")}
                      >
                        <IoIosAddCircleOutline className="fs20px white_color " />
                        <Typography className="fontWeight700 white_color fs14px ml5px">
                          Add User
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ border: "1px solid black" }}
                      className=" g_color fs16px   p_t-b10px border "
                    >
                      <Grid
                        container
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        // sx={{ border: "1px solid red" }}
                      >
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Typography className="  fs16px  p_l-r18px fontWeight700">
                            UID
                          </Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <Typography className="fs16px fontWeight700">
                            Device ID
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        // sx={{ border: "1px solid blue", display: "flex" }}
                        className="flex flex-end"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="flex center "
                        >
                          <Typography className=" fs16px fontWeight700  ">
                            Device Name
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="flex flexEnd  p_r30px"
                        >
                          <Typography className="fs16px p_r10px fontWeight700 ">
                            Action
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      justifyContent="center"
                      // alignItems="center"
                      sx={{
                        minHeight: "400px",
                        display: "block",
                        maxHeight: "400px",
                        overflow: "hidden",
                      }}
                      className=" border "
                    >
                      {clientDetails && clientDetails.length > 0 ? (
                        clientDetails.map((a, i) => (
                          <Grid
                            key={i}
                            container
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            // sx={{ height: '55px' }}border
                            className="  fs16px borderBottom "
                            sx={{ height: "55px" }}
                          >
                            <Grid container item xs={6} sm={6} md={6} lg={6}>
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{
                                  // border: '1px solid red',
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  className="  fs16px  p_l-r10px  fontWeight700 b1c_color"
                                  // sx={{ border: '1px solid red' }}
                                >
                                  {a?.clientID}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                sx={{
                                  // border: '1px solid red',
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography className="fs16px fontWeight700 b1c_color">
                                  {a?.clientName}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              item
                              xs={6}
                              sm={6}
                              md={6}
                              lg={6}
                              justifyContent="flex-end"
                              className="flex flex-end"
                            >
                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                className="flex center "
                                sx={{
                                  // border: "1px solid red",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Typography className="  fs16px fontWeight700  ">
                                  {a?.gateway?.length ? a?.gateway?.length : 0}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={6}
                                sm={6}
                                md={6}
                                lg={6}
                                className="flex  center  "
                                // sx={{ border: "1px solid red" }}
                              >
                                <Button
                                  onClick={() =>
                                    navigate(
                                      `/admin/user-management/${a._id}`,
                                      {
                                        state: a,
                                      }
                                    )
                                  }
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
                        // <Grid
                        //   container
                        //   item
                        //   alignItems="center"
                        //   sx={{
                        //     flexDirection: "column",
                        //     width: "40%",
                        //     margin: "0 auto",
                        //     marginTop: "100px",
                        //   }}
                        //   className="Greenborder  bRadius_8 Cursor"
                        //   onClick={() => {
                        //     navigate("/admin/user-management");
                        //   }}
                        // >
                        //   <img src={Add} alt="loading" className="M20" />
                        //   <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
                        //     Add Site
                        //   </Typography>
                        // </Grid>

                        <Grid
                          container
                          item
                          alignItems="center"
                          sx={{
                            flexDirection: "column",
                            width: "40%",
                            margin: "0 auto",
                            marginTop: "100px",
                          }}
                          className=" Cursor"
                          onClick={() => {
                            navigate("/admin/user-management");
                          }}
                        >
                          <img
                            src={Add}
                            alt="loading"
                            className=""
                            style={{
                              color: "#B58B5D",
                            }}
                          />
                          <Typography className="fs18px mt10px d_color fontWeight700 mb10px">
                            Add Livestock
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Grid container className="flexDir center mt150px border p20px">
                  <Typography className="fs24px fontWeight500 d_color">
                    No Client found{" "}
                  </Typography>
                  <Typography className="fs24px mt10px fontWeight700 d_color">
                    Please Add Client to see all the data here...
                  </Typography>
                  <Grid
                    container
                    item
                    alignItems="center"
                    sx={{ flexDirection: "column", width: "20%" }}
                    className="Greenborder  bRadius_8 Cursor mt20px"
                    onClick={() => {
                      navigate("/admin/device-management/add-site-management");
                    }}
                  >
                    <Grid container className="flexDir center centerJc">
                      {/* <img src={Add} alt="loading" className="M20 AddImg" /> */}
                      <Typography className="fs18px mt10px d_color fontWeight700 mb10px ">
                        Add Site
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default AdminDashBoard;
