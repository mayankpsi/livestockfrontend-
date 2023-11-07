import { Stack } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import SpokeIcon from '@mui/icons-material/Spoke';
import { useState } from "react";
import {BtnGroup, ChartCard} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";

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
    icon: <SpokeIcon sx={{ fontSize: "3em", color: "#B58B5D" }} />,
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
  }, {
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
]

const data = [
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

const labels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
// {
//   label: "Users gain",
//   data: data.map((ele) => ele?.userGain),
//   backgroundColor: ["#7C0202"],
//   borderColor: "#7C0202",
//   borderWidth: 1,
// },

const Health = () => {
  const { livestockHealthActiveTab, setLivestockHealthActiveTab } =
    useLivestockContext();
  const [livestockChartData, setLivestockChartData] = useState({
    labels: labels,
    datasetIdKey:'id',
    datasets: [
      {
        id: 1,
        label: 'a',
        data: [5, 6, 7,0,0,7,8],
      },
    ],
    options: {
      aspectRatio: 1,
    },
  });

  const data = {
    temperature:[
      {
        id:1,
        hour:1,
        value:23
      },
      {
        id:1,
        hour:1,
        value:23
      }
    ],
    heartRate:[
      {
        id:1,
        hour:1,
        value:23
      },
      {
        id:1,
        hour:1,
        value:23
      }
    ],
  }

  return (
    <Stack my={4} direction="column" alignItems="center" gap={4}>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <TypographyPrimary>
          Showing Health data of 25th Sep, 23
        </TypographyPrimary>
        <BtnGroup
          btnData={btnData}
          activeBtn={livestockHealthActiveTab}
          onChange={(ele) => setLivestockHealthActiveTab(ele)}
        />
      </Stack>
      <Stack width="100%" gap={2}>
        {
          chartCardData?.map(ele => (
            <ChartCard
            chartData={livestockChartData}
            label={ele.label}
            value={ele.value}
            icon={ele.icon}
            iconBg={ele.iconBg}
            valueColor={ele.valueColor}
          />
          ))
        }
      </Stack>
    </Stack>
  );
};

export default Health;
