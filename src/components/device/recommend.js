import React from "react";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  MenuItem,
} from "@mui/material";
const Recommend = () => {
  const data = [
    {
      name: "device1",
      SM: "0.6",
      S: "0.6",
      ph: "6.5",
      T: "50",
      K: "80",
      P: "80",
      CO2: "80",
      IN: "61",
    },
  ];
  return (
    <>
      <Grid
        container
        className=" AlignStart flexStart spaceBetween1  bRadius_8  mb20px"
        // style={{ border: "1px solid red" }}
      >
        {data.map((item, index) => {
          return (
            <Grid
              item
              key={index}
              lg={5}
              md={5}
              sm={5}
              xs={5}
              className="bRadius_8 border "
            >
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
                  <Typography className="fs14px">Soil Moisture</Typography>
                  <Typography className="fs24px fontWeight700 mt10px">
                    {item.SM} <span className="fs14px">awc</span>
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
                  <Typography className="fs16px p_l15px">Salinity</Typography>
                  <Typography className="fs24px fontWeight700 mt10px p_l15px">
                    {item.S} <span className="fs14px">ds/m</span>{" "}
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
                  <Typography className="fs14px">Soil Temperature</Typography>
                  <Typography className="fs24px fontWeight700 mt10px">
                    {item.T} <span className="fs14px">f</span>
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
                    {item.ph} <span className="fs14px">ds/m</span>{" "}
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
                  <Typography className="fs14px">Nitrate</Typography>
                  <Typography className="fs24px fontWeight700 mt10px">
                    {item.K} <span className="fs14px">awc</span>
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
                  <Typography className="fs16px p_l15px">Potassium</Typography>
                  <Typography className="fs24px fontWeight700 mt10px p_l15px">
                    {item.P} <span className="fs14px">ds/m</span>{" "}
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
                  <Typography className="fs14px">Phosphorus</Typography>
                  <Typography className="fs24px fontWeight700 mt10px">
                    {item.P} <span className="fs14px">ppm</span>
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
                  <Typography className="fs16px p_l15px">Co2</Typography>
                  <Typography className="fs24px fontWeight700 mt10px p_l15px">
                    {item.CO2} <span className="fs14px">ppm</span>{" "}
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
                  <Typography className="fs14px">Light Intensity</Typography>
                  <Typography className="fs24px fontWeight700 mt10px">
                    {item.IN} <span className="fs14px">lux</span>
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
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Recommend;
