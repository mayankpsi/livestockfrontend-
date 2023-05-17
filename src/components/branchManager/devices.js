import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  Button,
  Grid,
  Typography,
  Container,
  Divider,
  FormControl,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  Select,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import map from "../../assets/images/Dummy.png";
import Map from "../Common/detailMap";

import "swiper/css";
import "swiper/css/pagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Devices = ({ data }) => {
  // console.log("Data is ", data);
  const { gatewayName, branchName } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  // const { depthData, setDepthData } = useState(6);
  const [depthValue, setDepthValue] = useState({
    N: 0,
    E: 0,
    P: 0,
    K: 0,
    H: 0,
    Light: 0,
    PH: 0,
    co2: 0,
  });
  const [depthData, setDepthData] = useState([]);

  const changeDepthValue = (id, value) => {
    // console.log(id, value);
    let val = [...depthData];
    val.map((item) => {
      if (item._id === id) {
        item.showData = value;
      }
    });
    // console.log(val);
    setDepthData(JSON.parse(JSON.stringify(val)));
  };

  useEffect(() => {
    if (data) {
      let val = [...data];
      val.map((item) => {
        item.depth1Data = {
          ALERT: item?.nDepth1[0]?.ALERT,
          BAT: item?.nDepth1[0]?.BAT,
          CO2: item?.nDepth1[0]?.CO2,
          LIGHT: item?.nDepth1[0]?.LIGHT,
          O2: item?.nDepth1[0]?.O2,
          EC: item?.nDepth1[0]?.EC1,
          H: item?.nDepth1[0]?.H1,
          K: item?.nDepth1[0]?.K1,
          N: item?.nDepth1[0]?.N1,
          P: item?.nDepth1[0]?.P1,
          PH: item?.nDepth1[0]?.PH1,
          TEMP: item?.nDepth1[0]?.TEMP,
          address: item?.nDepth1[0]?.address,
        };
        item.depth2Data = {
          ALERT: item?.nDepth1[0]?.ALERT,
          BAT: item?.nDepth1[0]?.BAT,
          CO2: item?.nDepth1[0]?.CO2,
          LIGHT: item?.nDepth1[0]?.LIGHT,
          O2: item?.nDepth1[0]?.O2,
          EC: item?.nDepth1[0]?.EC2,
          H: item?.nDepth1[0]?.H2,
          K: item?.nDepth1[0]?.K2,
          N: item?.nDepth1[0]?.N2,
          P: item?.nDepth1[0]?.P2,
          PH: item?.nDepth1[0]?.PH2,
          TEMP: item?.nDepth1[0]?.TEMP,
          address: item?.nDepth1[0]?.address,
        };
        item.depth3Data = {
          ALERT: item?.nDepth1[0]?.ALERT,
          BAT: item?.nDepth1[0]?.BAT,
          CO2: item?.nDepth1[0]?.CO2,
          LIGHT: item?.nDepth1[0]?.LIGHT,
          O2: item?.nDepth1[0]?.O2,
          EC: item?.nDepth1[0]?.EC3,
          H: item?.nDepth1[0]?.H3,
          K: item?.nDepth1[0]?.K3,
          N: item?.nDepth1[0]?.N3,
          P: item?.nDepth1[0]?.P3,
          PH: item?.nDepth1[0]?.PH3,
          TEMP: item?.nDepth1[0]?.TEMP,
          address: item?.nDepth1[0]?.address,
        };
        item.showData = "depth1";
      });
      setDepthData(JSON.parse(JSON.stringify(val)));
    }
  }, [data]);
  return (
    <>
      <Grid container className="flex">
        <Typography className="fs18px mb20px fontWeight700">
          Device({data && data.length})
        </Typography>
      </Grid>

      {!isMd ? (
        <>
          <Grid container className="flex mb30px " style={{ flexWrap: "wrap" }}>
            <Swiper
              spaceBetween={15}
              slidesPerView={2.5}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              Autoplay={true}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {depthData &&
                depthData.length > 0 &&
                depthData.map((item, index) => {
                  let nodeDetails;
                  item?.nDepth1?.map((item) => {
                    nodeDetails = item;
                    // console.log(" NodeDetails>>>>", nodeDetails);
                  });
                  return (
                    <SwiperSlide
                      style={{
                        // width: "400%",
                        // border: '2px solid red',
                        boxShadow: "0px 1px 10px #DDDDDD",
                        minWidth: "40rem",
                      }}
                      key={index}
                      className="bRadius_8 "
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        className=" Width100"
                        // sx={{ border: '2px solid red' }}
                      >
                        <Map height={"250px"} changeable="false" />
                      </Grid>

                      <Grid
                        container
                        item
                        style={{
                          width: "100%",
                        }}
                        className=" flex spaceBetween p10px "
                      >
                        <Grid item>
                          <Typography className="fontWeight700 fs16px Transform_Capital g_color">
                            {item.nodeName}
                          </Typography>
                          <Button
                            className="fs14px  Transform_Capital d_color"
                            style={{ padding: "0px" }}
                            onClick={() => {
                              navigate(
                                `/${localStorage.getItem(
                                  "agro_type"
                                )}/site-management/${gatewayName}/${branchName}/${
                                  item._id
                                } `
                              );
                            }}
                          >
                            See details
                          </Button>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            width: "10rem",
                          }}
                        >
                          <select
                            className=" Selectdropstyle fs18px Selectdropstyle-noborder analytics_dropDown"
                            // value={depthData}
                            onChange={(e) => {
                              // console.log(item._id, e.target.value);
                              changeDepthValue(item._id, e.target.value);
                            }}
                          >
                            <option value="depth1">{item?.depth1}</option>
                            <option value="depth2">{item?.depth2}</option>
                            <option value="depth3">{item?.depth3}</option>
                          </select>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        className="flex  center p10px  p_l-r10px borderBottom"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="  p10px  flexStart borderRight "
                        >
                          <Typography className="fs16px">
                            Soil Moisture
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px">
                            {item?.[`${item.showData}Data`]?.H}
                            <span className="fs14px g_color">awc</span>
                          </Typography>
                        </Grid>
                        <Divider vertical />
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className=" p10px flexDir "
                        >
                          <Typography className="fs16px p_l15px">
                            Salinity
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px p_l15px">
                            {item?.[`${item.showData}Data`]?.EC}{" "}
                            <span className="fs14px g_color">ds/m</span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="flex  center p10px  p_l-r10px borderBottom"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="  p10px  flexStart borderRight "
                        >
                          <Typography className="fs16px">
                            Soil Temperature
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px">
                            {item?.[`${item.showData}Data`]?.TEMP}
                            <span className="fs14px Transform_Capital g_color">
                              F
                            </span>
                          </Typography>
                        </Grid>
                        <Divider vertical />
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className=" p10px flexDir "
                        >
                          <Typography className="fs16px p_l15px">pH</Typography>
                          <Typography className="fs24px fontWeight700 mt10px p_l15px">
                            {item?.[`${item.showData}Data`]?.PH}
                            <span className="fs14px g_color">ds/m</span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        className="flex  center p10px  p_l-r10px borderBottom"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="  p10px  flexStart borderRight "
                        >
                          <Typography className="fs16px">Nitrate</Typography>
                          <Typography className="fs24px fontWeight700 mt10px">
                            {item?.[`${item.showData}Data`]?.N}
                            <span className="fs14px g_color"> awc </span>
                          </Typography>
                        </Grid>
                        <Divider vertical />
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className=" p10px flexDir "
                        >
                          <Typography className="fs16px p_l15px">
                            Potassium
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px p_l15px">
                            {item?.[`${item.showData}Data`]?.K}
                            <span className="fs14px g_color">ds/m</span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        className="flex  center p10px  p_l-r10px borderBottom"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="  p10px  flexStart borderRight "
                        >
                          <Typography className="fs16px">Phosphorus</Typography>
                          <Typography className="fs24px fontWeight700 mt10px">
                            {item?.[`${item.showData}Data`]?.P}
                            <span className="fs14px g_color">ppm</span>
                          </Typography>
                        </Grid>
                        <Divider vertical />
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className=" p10px flexDir "
                        >
                          <Typography className="fs16px p_l15px">
                            Co2
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px p_l15px">
                            {item?.[`${item.showData}Data`]?.CO2}{" "}
                            <span className="fs14px g_color">ppm</span>{" "}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        className="flex  center p10px  p_l-r10px borderBottom bRadius_8"
                      >
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className="  p10px  flexStart borderRight "
                        >
                          <Typography className="fs16px">
                            Light Intensity
                          </Typography>
                          <Typography className="fs24px fontWeight700 mt10px">
                            {item?.[`${item.showData}Data`]?.LIGHT}{" "}
                            <span className="fs14px g_color">lux</span>
                          </Typography>
                        </Grid>
                        <Divider vertical />
                        <Grid
                          item
                          xs={6}
                          sm={6}
                          md={6}
                          lg={6}
                          className=" p10px flexDir "
                        ></Grid>
                      </Grid>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </Grid>
        </>
      ) : (
        <>
          {data &&
            data.length > 0 &&
            data?.map((item, index) => {
              let nodeDetails;
              item?.nDepth1?.map((item) => {
                nodeDetails = item;
                // console.log(" NodeDetails>>>>", nodeDetails);
              });
              return (
                <>
                  <Accordion
                    key={index}
                    className=" bRadius_8 mb20px"
                    style={{ border: "none !important" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className="fs16px Transform_Capital ">
                        {item?.nodeName}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className=" Width100"
                        >
                          {/* <img
                            src={item.img}
                            style={{ height: "244px" }}
                            className=" Width100"
                          /> */}
                          <Map height={"244px"} changeable="false" />
                        </Grid>

                        <Grid
                          container
                          item
                          style={{
                            width: "100%",
                            // border: "1px solid red",
                          }}
                          className=" flex spaceBetween p10px "
                        >
                          <Typography className="fontWeight700 fs16px Transform_Capital g_color">
                            {item.nodeName}
                          </Typography>
                          <Button
                            className="fs14px  Transform_Capital d_color"
                            style={{ padding: "0px" }}
                            onClick={() => {
                              navigate(
                                `/${localStorage.getItem(
                                  "agro_type"
                                )}/site-management/${gatewayName}/${branchName}/${
                                  item._id
                                } `
                              );
                            }}
                          >
                            See details
                          </Button>
                        </Grid>

                        <Grid container className="border ">
                          <Grid
                            container
                            className="flex  center p10px  p_l-r10px  borderBottom "
                          >
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className="  p10px  flexStart borderRight "
                            >
                              <Typography className="fs14px">
                                Soil Moisture
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px">
                                {depthValue?.H}{" "}
                                <span className="fs14px g_color">awc</span>
                              </Typography>
                            </Grid>
                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir borderRight "
                            >
                              <Typography className="fs16px p_l15px">
                                Salinity
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.EC}{" "}
                                <span className="fs14px g_color">ds/m</span>{" "}
                              </Typography>
                            </Grid>

                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir  borderRight"
                            >
                              <Typography className="fs16px p_l15px">
                                Soil Temperature
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.TEMP}
                                <span className="fs14px g_color">ds/m</span>
                              </Typography>
                            </Grid>

                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir "
                            >
                              <Typography className="fs16px p_l15px">
                                PH
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.PH}
                                <span className="fs14px g_color">ds/m</span>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className="flex  center p10px  p_l-r10px borderBottom "
                          >
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className="p10px  flexStart borderRight "
                            >
                              <Typography className="fs16px">
                                Nitrate
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px">
                                {depthValue?.N}
                                <span className="fs14px g_color">awc</span>
                              </Typography>
                            </Grid>
                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir   borderRight "
                            >
                              <Typography className="fs16px p_l15px ">
                                Potassium
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.K}
                                <span className="fs14px g_color">ds/m</span>
                              </Typography>
                            </Grid>

                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir  borderRight "
                            >
                              <Typography className="fs16px p_l15px">
                                Phosphorus
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.P}
                                <span className="fs14px g_color">ds/m</span>
                              </Typography>
                            </Grid>

                            <Divider vertical />
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className=" p10px flexDir "
                            >
                              <Typography className="fs16px p_l15px">
                                C02
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px p_l15px">
                                {depthValue?.co2}
                                <span className="fs14px g_color">ds/m</span>
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className="flex  flexStart p10px  p_l-r10px  "
                          >
                            <Grid
                              item
                              xs={3}
                              sm={3}
                              md={3}
                              lg={3}
                              className="  p10px  flexStart borderRight "
                            >
                              <Typography className="fs16px">
                                Light Intensity
                              </Typography>
                              <Typography className="fs24px fontWeight700 mt10px">
                                {nodeDetails?.LIGHT}
                                <span className="fs14px g_color">awc</span>
                              </Typography>
                            </Grid>
                            <Divider vertical />
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </>
              );
            })}
        </>
      )}
    </>
  );
};

export default Devices;
