import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import {
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  ButtonGroup,
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import faker from "faker";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
// import UnitTable from "../Common/unitTable";
import { adminRequest } from "../../../../../requestMethod";
import { setLoader, useLoaderController } from "../../../../../context/common";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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
  const [user, setUser] = useState([]);
  const [date, setDateValue] = useState(currentDate);
  const [open, setOpen] = useState(false);
  const [orderType, setOrderType] = useState("N");
  const [details, setDetails] = useState();
  const { gatewayName, branchName, deviceId } = useParams();
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
  const [lastDate, setLastDate] = useState("");
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
        data: labels.map(() => faker.datatype.number({ min: 90, max: 102 })),
        borderColor: "rgba(181, 139, 93, 1)",
        barRadius: 10,
        tension: 0.5,
        background: "rgba(181, 139, 93, 1)",
      },
    ],
  };

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

  return (
    <>
      <Grid container className="flex  flexEnd p20px mb10px ">
        <ButtonGroup
          //   variant="contained"
          aria-label=" d_bgcolor bRadius_8 border Gbtn "
        >
          <Button className="fs14px p10px white_color d_bgcolor bRadius_8-1Left-tb Gbtn p_l-r13-60px ">
            Today
          </Button>
          <Button className=" fs14px p10px  d_bgcolor white_color Gbtn">
            Week
          </Button>
          <Button className=" fs14px p10px d_bgcolor bRadius_8-1BottomRight-tb  white_color Gbtn p_l-r13-60px ">
            Month
          </Button>
        </ButtonGroup>
      </Grid>

      <Grid container className="flex spaceBetween">
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={5.5}
          lg={5.5}
          className=" fs16px Width100 border  p20px bRadius_10, flecdir."
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

          {/* <Line
              options={options}
              data={dataChart}
              className=" pl10px  pr10px pb15px "
            /> */}
        </Grid>

        <Grid
          container
          item
          xs={12}
          sm={12}
          md={5.5}
          lg={5.5}
          className=" fs16px Width100 border  p20px bRadius_10 "
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
            // <Bar options={options1} data={dataChart1} />
            <></>
          ) : (
            <Line
              options={options}
              data={dataChart1}
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
    </>
  );
};

export default Health;
