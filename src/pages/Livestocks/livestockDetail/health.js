import { Stack, Box } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import SpokeIcon from "@mui/icons-material/Spoke";
import { useState, useEffect } from "react";
import { request } from "../../../apis/axios-utils";
import { ChartCard, DatePicker } from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { LiveStockSteps, LiveStockRumination } from "../../../assets";

const chartCardData = [
  {
    label: "temperature",
    value: "56° C",
    icon: (
      <ThermostatIcon sx={{ fontSize: "3em", color: "rgba(253, 55, 48,1)" }} />
    ),
    iconBg: "#60AEDA",
    valueColor: "err-color",
  },
  {
    label: "heartbeat",
    value: "78/sec",
    icon: (
      <MonitorHeartIcon
        sx={{ fontSize: "3em", color: "rgba(253, 55, 48,1)" }}
      />
    ),
    iconBg: "rgba(253, 55, 48, 0.25)",
    valueColor: "color-success--dark ",
  },
  {
    label: "steps",
    value: "5000",
    icon: <Box component="img" src={LiveStockSteps} />,
    iconBg: "#A2F8F2",
    valueColor: "color-success--dark ",
  },
  {
    label: "rumination",
    value: "2h",
    icon: <Box component="img" src={LiveStockRumination} />,
    iconBg: "#A2F8F2",
    valueColor: "color-success--dark ",
  },
];

const btnData = [
  {
    label: "Today",
  },
  {
    label: "7 days",
  },
  {
    label: "1 Month",
  },
  {
    label: "3 Month",
  },
];

const healthData = [
  {
    id: 1,
    time: 0,
    temp: 46,
  },
  {
    id: 2,
    time: 2.4,
    temp: 28,
  },
];

const chartData = [
  {
    id: 1,
    year: 2016,
    userGain: 1000,
  },
  {
    id: 2,
    year: 2017,
    userGain: 500,
  },
  {
    id: 3,
    year: 2018,
    userGain: 300,
  },
  {
    id: 4,
    year: 2019,
    userGain: 600,
  },
  {
    id: 5,
    year: 2020,
    userGain: 200,
  },
  {
    id: 1,
    year: 2016,
    userGain: 1000,
  },
  {
    id: 10,
    year: 2016,
    userGain: 1000,
  },
  {
    id: 2,
    year: 2017,
    userGain: 500,
  },
  {
    id: 3,
    year: 2018,
    userGain: 300,
  },
  {
    id: 4,
    year: 2019,
    userGain: 600,
  },
  {
    id: 5,
    year: 2020,
    userGain: 200,
  },
];

const Health = ({ data }) => {
  const { livestockHealthActiveTab, setLivestockHealthActiveTab } =
    useLivestockContext();
  const { formattedDate } = useDateFormat();

  const [selectedDate, setSelectedDate] = useState(formattedDate(new Date()));
  const [livestockChartData, setLivestockChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: ["#7C0202"],
        borderColor: "#7C0202",
        borderWidth: 1,
      },
    ],
    options: {
      aspectRatio: 1,
    },
  });
  const [healthData, setHealthData] = useState([]);

  //GET ALL ALERTS THRESHOLD
  useEffect(() => {
    if (data?.id) {
      request({
        url: `/liveStock/getLiveStockHistory?LiveStockId=${data?.id}&currentDate=${selectedDate}&EndDate=${selectedDate}`,
      })
        .then((res) => {
          const { data } = res?.data;
          if (res?.status === 200) {
            const formattedData = data?.map((ele) => ({
              temperature: ele?.temperature,
              heartbeat: ele?.heartBeat,
              steps: ele?.steps,
              rumination: ele?.rumination,
              time: formattedDate(ele?.createdAt, "time"),
            }));
            setHealthData([...formattedData?.slice(0, 24)]);
          }
        })
        .catch((err) => console.log(err, "cdjbhdbchdhdcvhdcvh"));
    }
  }, [data?.id, selectedDate]);

  const getFilteredHealthData = (data, filter) => {
    const labels = data?.map((ele) => ele?.time);
    const dataSet = data?.map((ele) => ele[filter]);

    const options = {
      labels,
      datasets: [
        {
          label:
            filter?.charAt(0)?.toUpperCase() + filter?.slice(1)?.toLowerCase(),
          data: dataSet,
          backgroundColor: ["#7C0202"],
          borderColor: "#7C0202",
          borderWidth: 1,
        },
      ],
      options: {
        aspectRatio: 1,
      },
    };
    return options;
  };

  return (
    <Stack my={4} direction="column" alignItems="center" gap={4}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <TypographyPrimary sx={{ fontSize: "21px" }}>
          Showing Health data of 25th Sep, 23
        </TypographyPrimary>
        <DatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Stack>
      <Stack width="100%" gap={2}>
        {chartCardData?.map((ele) => (
          <ChartCard
            chartData={getFilteredHealthData(healthData, ele?.label)}
            label={ele.label}
            value={ele.value}
            icon={ele.icon}
            iconBg={ele.iconBg}
            valueColor={ele.valueColor}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Health;
