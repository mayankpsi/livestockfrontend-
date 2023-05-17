import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { PointElement, LineElement } from "chart.js";
import { Bar } from "react-chartjs-2";

import { Line } from "react-chartjs-2";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import UnitTable from "../Common/unitTable";
import { adminRequest } from "../../requestMethod";

import { setLoader, useLoaderController } from "../../context/common";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = ({ data }) => {
  const { deviceId } = useParams();

  const currentDate = moment().format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState([]);
  const [date, setDateValue] = useState(currentDate);
  const [depth, setDepth] = useState("depth1");
  const [orderType, setOrderType] = useState("N");
  const [active, setActive] = useState(0);
  const [labels, setLabels] = useState([]);
  const [lastDate, setLastDate] = useState("");
  const [open, setOpen] = useState(false);
  const [controller, dispatch] = useLoaderController();
  const [NoData, setNoData] = useState("false");
  const getDays = (length) => {
    let days = [];
    for (let i = 0; i < length; i++)
      days.push(moment(currentDate).subtract(i, "days").format("DD/MM/YYYY"));

    return days;
  };

  const times = [
    "12:00am",
    "12:30am",

    "01:00am",
    "01:30am",

    "02:00am",
    "02:30am",

    "03:00am",
    "03:30am",

    "04:00am",
    "04:30am",

    "05:00am",
    "05:30am",

    "06:00am",
    "06:30am",

    "07:00am",
    "07:30am",

    "08:00am",
    "08:30am",

    "09:00am",
    "09:30am",

    "10:00am",
    "10:30am",

    "11:00am",
    "11:30am",

    "12:00pm",
    "12:30pm",

    "01:00pm",
    "01:30pm",

    "02:00pm",
    "02:30pm",

    "03:00pm",
    "03:30pm",

    "04:00pm",
    "04:30pm",

    "05:00pm",
    "05:30pm",

    "06:00pm",
    "06:30pm",

    "07:00pm",
    "07:30pm",

    "08:00pm",
    "08:30pm",

    "09:00pm",
    "09:30pm",

    "10:00pm",
    "10:30pm",

    "11:00pm",
    "11:30pm",

    "12:00pm",
    "12:30pm",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dataChart = {
    labels,
    datasets: [
      {
        label: "Analytics",
        data: user,
        borderColor: "rgba(52, 125, 0, 100)",
        tension: 0.5,
        backgroundColor: "rgbargba(52, 125, 0, 0.5)",
      },
    ],
  };

  const dataChart1 = {
    labels,
    datasets: [
      {
        label: "Analytics",
        data: user,
        // borderColor: "rgba(52, 125, 0, 100)",
        barRadius: 10,

        tension: 0.5,
        backgroundColor: "#347D00",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    barRadius: 20,
    barThickness: 20,
  };

  const getBMGraphDetails = async (newDate = null) => {
    let formatDate =
      newDate == null ? date : moment(newDate).format("YYYY-MM-DD");
    let body = {
      nDepth_id: `${data[0]?.nDepth1[0]?._id}`,
      // nDepth_id: "642a6e47f9c479896c691b2d",
      depth: depth,
      currentDate:
        active == 2 || active == 3 || active == 4 ? null : formatDate,
      valueType: orderType,
      lastDate: lastDate,
    };

    console.log("body Is", body);
    setNoData("false");
    setLoader(dispatch, true);
    try {
      const res = await adminRequest.post(`/site/getNDepthHistory`, body);
      console.log(">>getBmDepthHistory", res);

      if (res.status == 200) {
        let index = depth == 18 ? 2 : depth == 26 ? 3 : 1;
        if (
          orderType == "O2" ||
          orderType == "CO2" ||
          orderType == "TEMP" ||
          orderType == "LIGHT"
        )
          index = "";
        let data = [];
        let datas = res?.data?.data;
        if (datas.length > 0) {
          /* if any data is not available then we set 0 value. in dates */
          if (active == 2 || active == 3) {
            let length = active == 2 ? 7 : 30;

            for (let i = 0; i < length; i++) {
              let flag = false;
              let date = moment(currentDate)
                .subtract(i, "days")
                .format("YYYY-MM-DD");

              for (let j = 0; j < datas?.length; j++) {
                if (date == datas?.[j]?._id) {
                  flag = true;
                  data.push(+datas?.[j]?.averageValue.toFixed(2));
                  break;
                }
              }

              if (!flag) data.push(0);
            }
          } else if (active == 4) {
            /* if any data is not available then we set 0 value. */

            for (let i = 1; i <= 12; i++) {
              let flag = false;

              for (let j = 0; j < datas.length; j++) {
                if (i == datas[j]?._id?.month) {
                  flag = true;
                  data.push(+datas[j]?.averageValue.toFixed(2));
                  break;
                }
              }

              if (!flag) data.push(0);
            }
          } else {
            /* This logic set for 24 hour with 30 minuts gap. Data is ascending order */
            for (let i = 2; i <= 49; i++) {
              let flag = false;
              let hour = parseInt(i / 2);
              let minut = i % 2 == 0 ? 0 : 30;

              for (let j = 0; j < datas.length; j++) {
                if (
                  hour == datas?.[j]?._id?.hour &&
                  minut == datas?.[j]?._id?.minute
                ) {
                  flag = true;
                  data.push(+datas?.[j]?.averageValue.toFixed(2));
                  break;
                }
              }

              if (!flag) data.push(0);
            }
          }
        } else {
          setNoData("true");
        }
        console.log("Data is ", active, data);
        setUser(data);

        setLoader(dispatch, false);
      } else {
        setLoader(dispatch, false);
        console.log("error ");
      }
    } catch (err) {
      setLoader(dispatch, false);

      console.log("error in getNodeDetails", err);
    }
  };

  useEffect(() => {
    if (active == 0) setLabels(times);

    if (active != 5) getBMGraphDetails();
    else getBMGraphDetails(moment(startDate).format("YYYY-MM-DD"));
  }, [orderType, depth, active, startDate]);

  return (
    <>
      <UnitTable
        data={
          data &&
          data.length > 0 &&
          data[0]?.nDepth1 &&
          data[0]?.nDepth1.length > 0 &&
          data[0]?.nDepth1[0]
        }
        heading={data && data}
      />
      <Divider className="Divider" />
      <Grid
        container
        className=" AlignStart flexStart spaceBetween1  bRadius_8  mb20px"
      >
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="mt10px flexDir spaceBetween border bRadius_8 p10px"
        >
          <Grid
            container
            item
            lg={12}
            md={12}
            sm={12}
            xs={12}
            // className="spaceBetween "
            sx={{ columnGap: "1.5rem" }}
          >
            <Grid container item md={4.5} columnGap="1rem">
              <Grid item md={4}>
                <FormControl
                  sx={{
                    width: "100%",
                    fontFamily: "oswald",
                  }}
                  className="Selectdropstyle fs10px"
                  size="small"
                >
                  <TextField
                    select
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="demo-select-small"
                    id="demo-select-small"
                    // inputProps={{ "aria-label": "Without label" }}
                    value={orderType}
                    defaultValue={0}
                    onChange={(e) => {
                      setOrderType(e.target.value);
                    }}
                  >
                    <MenuItem value={"N"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Nitrogen
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"H"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Humidity
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"K"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Potassium
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"P"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Phosphorus
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"PH"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        PH
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"EC"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        EC
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"O2"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Oxygen
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"CO2"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        CO2
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"TEMP"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        Temperature
                      </Typography>
                    </MenuItem>

                    <MenuItem value={"LIGHT"} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        LIGHT
                      </Typography>
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid item md={4}>
                <FormControl
                  sx={{
                    width: "100%",
                    fontFamily: "oswald",
                  }}
                  className="Selectdropstyle fs10px"
                  size="mdall"
                >
                  <TextField
                    select
                    className="Selectdropstyle-noborder analytics_dropDown "
                    labelid="depth_node"
                    id="depth_node"
                    value={depth}
                    defaultValue={0}
                    onChange={(e) => {
                      setDepth(e.target.value);
                    }}
                  >
                    <MenuItem value={`depth1`} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        `Depth {data[0]?.depth1}`
                      </Typography>
                    </MenuItem>

                    <MenuItem value={`depth2`} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px ">
                        `Depth {data[0]?.depth2}`
                      </Typography>
                    </MenuItem>

                    <MenuItem value={`depth3`} className="Selectmenustyle">
                      <Typography className="Selectmenustyle fs10px  ">
                        `Depth {data[0]?.depth3}`
                      </Typography>
                    </MenuItem>
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container item md={7.3} justifyContent="space-around">
              <Grid item md={2.5}>
                {/* sx={{ position: "relative" }}  */}

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    className="border datepicker  bRadius_8 analytic-datepicker"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    // disabled={!dateType ? true: false}
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(new Date(date));
                      setDateValue(moment(date).format("YYYY-MM-DD"));
                      setLabels(times);
                      setActive(5);
                      // getBMGraphDetails(moment(date).format("YYYY-MM-DD"));
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="filled"
                        // className=" "
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Start date",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item className=" d-flex" md={2}>
                <Button
                  onClick={() => {
                    setActive(4);
                    setLastDate(
                      moment(currentDate)
                        .subtract(1, "years")
                        .format("YYYY-MM-DD")
                    );
                    setLabels(months);
                  }}
                  className={
                    active == 4
                      ? "diffent-days agro-bg color-white fs10px"
                      : "diffent-days color-8F8F8F fs10px"
                  }
                >
                  Last year
                </Button>
              </Grid>
              <Grid item className=" d-flex" md={2}>
                <Button
                  onClick={() => {
                    setActive(3);
                    setLabels(getDays(30));
                    setLastDate(
                      moment(currentDate)
                        .subtract(1, "month")
                        .format("YYYY-MM-DD")
                    );
                  }}
                  className={
                    active == 3
                      ? "diffent-days agro-bg color-white fs10px"
                      : "diffent-days color-8F8F8F fs10px"
                  }
                >
                  Last 30 days
                </Button>
              </Grid>
              <Grid item className=" d-flex" md={2}>
                <Button
                  onClick={() => {
                    setActive(2);
                    setLabels(getDays(7));
                    setLastDate(
                      moment(currentDate)
                        .subtract(7, "days")
                        .format("YYYY-MM-DD")
                    );
                  }}
                  className={
                    active == 2
                      ? "diffent-days agro-bg color-white fs10px"
                      : "diffent-days color-8F8F8F fs10px"
                  }
                >
                  Last 7 days
                </Button>
              </Grid>
              <Grid item className=" d-flex" md={1.5}>
                <Button
                  onClick={() => {
                    setActive(1);
                    setDateValue(
                      moment(currentDate)
                        .subtract(1, "days")
                        .format("YYYY-MM-DD")
                    );
                    setLabels(times);
                    setStartDate(
                      new Date(moment(currentDate).subtract(1, "days").format())
                    );
                  }}
                  className={
                    active == 1
                      ? "diffent-days agro-bg color-white fs10px"
                      : "diffent-days color-8F8F8F fs10px"
                  }
                >
                  Yesterday
                </Button>
              </Grid>

              <Grid item className=" d-flex" md={1.3}>
                <Button
                  onClick={() => {
                    setActive(0);
                    setDateValue(currentDate);
                    setStartDate(new Date(currentDate));
                  }}
                  className={
                    active == 0
                      ? "diffent-days agro-bg color-white fs10px"
                      : "diffent-days color-8F8F8F fs10px"
                  }
                  sx={{ border: "1px solid red" }}
                >
                  Today
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            className=" fs16px Width100"
            sx={{ position: "relative" }}
          >
            {NoData == "true" && (
              <Grid
                container
                className=" fs16px Width100 flex center"
                sx={{
                  position: "absolute",
                  top: "50%",
                  // opacity: 0.1,
                }}
              >
                <Typography className="fs20px d_color Transform_Capital fontWeight700  ">
                  No Data Found
                </Typography>
              </Grid>
            )}
            {active == 4 || active == 3 || active == 2 ? (
              <Bar options={options1} data={dataChart1} />
            ) : (
              <Line
                options={options}
                data={dataChart}
                className=" pl10px  pr10px pb15px "
              />
            )}

            {/* <Line
              options={options}
              data={dataChart}
              className=" pl10px  pr10px pb15px "
            /> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Analytics;
