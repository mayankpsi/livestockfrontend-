import React, { useEffect, useState } from "react";
import moment from "moment";

import { Grid, Typography, ButtonGroup, Button } from "@mui/material";
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
import faker from "faker";
import { Line } from "react-chartjs-2";

import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import UnitTable from "../Common/unitTable";
import { adminRequest } from "../../../../../requestMethod";
import { setLoader, useLoaderController } from "../../../../../context/common";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  // LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
const Health = () => {
  const currentDate = moment().format("YYYY-MM-DD");

  const [startDate, setStartDate] = useState(new Date());
  const [details, setDetails] = useState();

  const [controller, dispatch] = useLoaderController();
  const [depth, setDepth] = useState("depth1");
  const [active, setActive] = useState(0);
  const [labels, setLabels] = useState([
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
  ]);
  const [dataType, setDateType] = useState("today");
  const [lastDate, setLastDate] = useState("");
  const [NoData, setNoData] = useState("false");

  const getDays = (length) => {
    let days = [];
    for (let i = 0; i < length; i++)
      days.push(moment(currentDate).subtract(i, "days").format("DD/MM/YYYY"));
    console.log(days);
    setLabels(days);
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

  const dataChart = {
    labels,
    datasets: [
      {
        label: "heartbeat",
        // data: user,
        data: labels.map(() => faker.datatype.number({ min: 60, max: 90 })),

        borderColor: "rgba(181, 139, 93, 1)",
        tension: 0.5,
        background: "rgba(181, 139, 93, 1)",
      },
    ],
  };

  const dataChart1 = {
    labels,
    datasets: [
      {
        label: "Temperature",
        // data: user,
        data: labels.map(() => faker.datatype.number({ min: 90, max: 110 })),
        borderColor: "rgba(181, 139, 93, 1)",
        barRadius: 10,
        tension: 0.5,
        background: "rgba(181, 139, 93, 1)",
      },
    ],
  };

  // const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datasets, setDataSets] = useState([]);
  const [dates, setAnalyticsDate] = useState([
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
  ]);

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));

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

  function dateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate).toISOString().split("T")[0]);
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray;
  }

  useEffect(() => {
    if (dataType === "today") {
      setLabels(times);
    }
    if (dataType === "last7days") {
      getDays(7);
    }
    if (dataType === "monthly") {
      getDays(30);
    }
  }, [dataType]);

  useEffect(() => {
    if (dataType === "today") {
      setDataSets([
        {
          label: "heartbeat",
          // data: user,
          data: labels.map(() => faker.datatype.number({ min: 60, max: 90 })),
          borderColor: "rgba(181, 139, 93, 1)",
          tension: 0.5,
          background: "rgba(181, 139, 93, 1)",
        },
      ]);
    } else if (dataType === "last7days") {
      setDataSets([
        {
          label: "heartbeat",
          // data: user,
          data: labels.map(() => faker.datatype.number({ min: 60, max: 100 })),
          borderColor: "rgba(181, 139, 93, 1)",
          tension: 0.5,
          background: "rgba(181, 139, 93, 1)",
        },
      ]);
    } else if (dataType === "monthly") {
      setDataSets([
        {
          label: "heartbeat",
          // data: user,
          data: labels.map(() => faker.datatype.number({ min: 60, max: 90 })),
          borderColor: "rgba(181, 139, 93, 1)",
          tension: 0.5,
          background: "rgba(181, 139, 93, 1)",
        },
      ]);
    }
  }, [dataType]);

  const data = {
    labels:
      dates && dataType == "today"
        ? dates
        : dates.length === 24
        ? times
        : dates?.length == 12,

    datasets: datasets,
  };
  return (
    <>
      <Grid container className="flex  center p20px mb10px ">
        <ButtonGroup
          //   variant="contained"
          aria-label="  bRadius_8 border Gbtn Greenborder "
        >
          <Button
            className={
              dataType === "today"
                ? "fs14px p10px white_color d_bgcolor bRadius_8-1Left-tb  p_l-r13-60px"
                : "fs14px p10px Greenborder  d_color bRadius_8-1Left-tb "
            }
            // className="fs14px p10px white_color d_bgcolor bRadius_8-1Left-tb Gbtn p_l-r13-60px "
            onClick={() => setDateType("today")}
          >
            Today
          </Button>
          <Button
            // className=" fs14px p10px  d_bgcolor white_color Gbtn"
            className={
              dataType === "last7days"
                ? "fs14px p10px  d_bgcolor white_color Gbtn"
                : "fs14px p10px Greenborder  d_color "
            }
            onClick={() => setDateType("last7days")}
          >
            Week
          </Button>
          <Button
            className={
              dataType === "monthly"
                ? "fs14px p10px d_bgcolor bRadius_8-1BottomRight-tb  white_color Gbtn p_l-r13-60px"
                : "fs14px p10px Greenborder bRadius_8-1BottomRight-tb  d_color  p_l-r13-60px"
            }
            // className="  "
            onClick={() => setDateType("monthly")}
          >
            Month
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid container className="flex spaceBetween" style={{ rowGap: "2rem" }}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="  Width100  "
        >
          {" "}
          <Typography className="fs24px fontWeight700 d_color Transform_Capital">
            {" "}
            Heartbeat
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className=" fs16px Width100 border  p20px bRadius_10 "
          sx={{ position: "relative", columnGap: "span" }}
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
            // <Bar options={options1} data={dataChart1} />
            <></>
          ) : (
            <Line
              options={options}
              data={dataChart}
              className=" pl10px  pr10px pb15px "
            />
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="  Width100  "
        >
          {" "}
          <Typography className="fs24px fontWeight700 d_color Transform_Capital">
            {" "}
            Temperature
          </Typography>
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className=" fs16px Width100 border  p20px bRadius_10 "
          // sx={{ position: "relative" }}
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
            // <Bar options={options1} data={dataChart1} />
            <></>
          ) : (
            <Line
              options={options}
              data={dataChart1}
              className=" pl10px  pr10px pb15px "
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Health;
