import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import moment from "moment";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import map from "../../assets/images/Dummy.png";
const UnitTable = ({ data, heading }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const date = new Date();
  // const data = [
  //   {
  //     img: map,
  //     name: 'device1',
  //     SM: '0.6',
  //     S: '0.6',
  //     ph: '6.5',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  //   {
  //     img: map,
  //     name: 'device2',
  //     ph: '6.5',
  //     SM: '0.6',
  //     S: '0.6',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  //   {
  //     img: map,
  //     name: 'device3',
  //     ph: '6.5',
  //     SM: '0.6',
  //     S: '0.6',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  //   {
  //     img: map,
  //     name: 'device4',
  //     ph: '6.5',
  //     SM: '0.6',
  //     S: '0.6',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  //   {
  //     img: map,
  //     name: 'device5',
  //     ph: '6.5',
  //     SM: '0.6',
  //     S: '0.6',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  //   {
  //     img: map,
  //     name: 'device6',
  //     ph: '6.5',
  //     SM: '0.6',
  //     S: '0.6',
  //     T: '50',
  //     K: '80',
  //     P: '80',
  //     CO2: '80',
  //     IN: '61',
  //   },
  // ];

  useEffect(() => {
    console.log("data>> depth", data, heading);
  }, [data, heading]);
  return (
    <>
      {!isMd ? (
        <>
          <Grid container className="border bRadius_8 mb20px ">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ height: "45px" }}
              className="d_bgcolor p10px spaceBetween bRadius_8-2 "
            >
              <Typography className="fontWeight700 white_color fs18px">
                Today’s Data : {date && moment(date).format("LLL")}
              </Typography>
              {/* <Button
            className=" white_color  fs16px fontWeight700 Transform_Lower fs16px "
            sx={{ padding: "0px" }}
            onClick={() => {
              // navigate("/user/site");
            }}
          >
            see All
          </Button> */}
            </Grid>

            <Grid container className="  ">
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  {" "}
                  Depth
                </Typography>
                <Typography className="fs16px g_color "> inch</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Soil Moisture
                </Typography>
                <Typography className="fs16px g_color "> awc</Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Salinity
                </Typography>
                <Typography className="fs16px g_color ">ds/m</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Soil Temperature
                </Typography>
                <Typography className="fs16px g_color ">c</Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir AlignStart  p10px"
              >
                <Typography
                  className="fs16px g_color  fontWeight500 "
                  style={{ textAlign: "center" }}
                >
                  ph
                </Typography>
                <Typography className="fs16px g_color "> </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Nitrate
                </Typography>
                <Typography className="fs16px g_color ">ppm</Typography>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Potassium
                </Typography>
                <Typography className="fs16px g_color ">ppm</Typography>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Phosphorus
                </Typography>
                <Typography className="fs16px g_color ">ppm</Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center p10px"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  Co2
                </Typography>
                <Typography className="fs16px g_color  "> %</Typography>
              </Grid>
            </Grid>
            <Grid container className=" ">
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs20px  fontWeight700">
                  {heading && heading[0]?.depth1}'
                </Typography>
                <Typography className="fs14px"> </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.EC1}
                </Typography>
                {/* <Grid className="d_bgcolor"></Grid> */}
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid red" }}
                >
                  {data?.H1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.TEMP}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.PH1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.N1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.K1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.P1}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p10px"
              >
                <Typography
                  className="fs20px"
                  sx={{ borderBottom: "2px solid green" }}
                >
                  {data?.CO2}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="  ">
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center  borderRight p20px"
              >
                <Typography className="fs20px fontWeight700">
                  {" "}
                  {heading && heading[0]?.depth2}'
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.EC2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.H2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.TEMP}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.PH2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.N2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.K2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.P2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center   p20px"
              >
                <Typography className="fs20px">{data?.CO2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
            </Grid>
            <Grid container className="">
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center borderRight  p10px"
              >
                <Typography className="fs20px fontWeight700">
                  {" "}
                  {heading && heading[0]?.depth3}'
                </Typography>
                <Typography className="fs14px"> </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.EC3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.H3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.TEMP}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.PH3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.N3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.K3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1.5}
                sm={1.5}
                md={1.5}
                lg={1.5}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.P3}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
              <Grid
                item
                xs={1}
                sm={1}
                md={1}
                lg={1}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px">{data?.CO2}</Typography>
                <Grid className="d_bgcolor"></Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container className="border bRadius_8 mb20px ">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ height: "45px" }}
              className="d_bgcolor p10px spaceBetween bRadius_8-2 "
            >
              <Typography className="fontWeight700 white_color fs18px">
                Today’s Data : {date && moment(date).format("L")}
              </Typography>
              {/* <Button
            className=" white_color  fs16px fontWeight700 Transform_Lower fs16px "
            sx={{ padding: "0px" }}
            onClick={() => {
              // navigate("/user/site");
            }}
          >
            see All
          </Button> */}
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px borderBottom"
              >
                <Typography className="fs16px g_color  fontWeight500 ">
                  {" "}
                  Depth
                </Typography>
                <Typography className="fs16px g_color "> inch</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px borderBottom"
              >
                <Typography className="fs20px fontWeight500 ">
                  {heading && heading[0]?.depth1}'
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px borderBottom"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {heading && heading[0]?.depth2}'
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px borderBottom"
              >
                <Typography className="fs20px fontWeight500 ">
                  {heading && heading[0]?.depth3}`
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Soil Moisture
                </Typography>
                <Typography className="fs16px g_color "> wfv</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.EC1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.EC2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.EC3}
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Salinity
                </Typography>
                <Typography className="fs16px g_color "> ds/m</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.H1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.H2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.H3}
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Soil Temperature
                </Typography>
                <Typography className="fs16px g_color "> F</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.TEMP}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.TEMP}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.TEMP}
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  PH
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.PH1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.PH2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.PH3}
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Nitrate
                </Typography>
                <Typography className="fs16px g_color "> ppm</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.N1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {data?.N2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {data?.N3}
                </Typography>
              </Grid>
            </Grid>

            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Potassium
                </Typography>
                <Typography className="fs16px g_color "> ppm</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {data?.K1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.K2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.K3}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  Phosphorus
                </Typography>
                <Typography className="fs16px g_color "> ppm</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.P1}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {" "}
                  {data?.P2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.P3}
                </Typography>
              </Grid>
            </Grid>
            <Grid container className="mb10px  ">
              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center borderRight p10px"
              >
                <Typography className="fs16px g_color  fontWeight700 ">
                  C02
                </Typography>
                <Typography className="fs16px g_color "> %</Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {" "}
                  {data?.CO2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px  fontWeight500 ">
                  {data?.CO2}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                sm={3}
                md={3}
                lg={3}
                className="flexDir center  p10px"
              >
                <Typography className="fs20px fontWeight500 ">
                  {data?.CO2}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default UnitTable;
