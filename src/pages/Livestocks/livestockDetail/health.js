import { Stack } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useState, useEffect } from "react";
import { ChartCard, BtnGroup } from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { chartCardData } from "../Data";
import useGetColorDynamically from "../../../hooks/useGetColorDynamically";
import TemperatureSection from "./ChartSection/temperatureSection";
import HeartbeatSection from "./ChartSection/heartbeatSection";
import StepsSection from "./ChartSection/stepsSection";
import ActivitySection from "./ChartSection/activitySection";
import RuminationSection from "./ChartSection/ruminationSection";
import { useLivestockHealthContext } from "../../../context/LivestockHealthContext";

const btnData = [
  {
    label: "temperature",
  },
  {
    label: "heartbeat",
  },
  {
    label: "steps counter",
  },
  {
    label: "activity tracker",
  },
  {
    label: "rumination",
  },
];

const Health = ({ data }) => {
  const [showHealthTab, setShowHealthTab] = useState("temperature");
  const { getLongDateFormat } = useDateFormat();
  const { getDynamicColor } = useGetColorDynamically();
  const { healthChartData, activeTab, setActiveTab } =
    useLivestockHealthContext();

  const [singleSelectedDate, setSingleSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const showSection = (key) => {
    if (data?.thresholds) {
      const { heartBeat, rumination, temperature, steps } = data?.thresholds;
      if (key === "temperature") {
        return <TemperatureSection thresholds={temperature} />;
      } else if (key === "heartbeat") {
        return <HeartbeatSection thresholds={heartBeat} />;
      } else if (key === "steps counter") {
        return <StepsSection thresholds={steps} />;
      } else if (key === "activity tracker") {
        return <ActivitySection />;
      } else if (key === "rumination") {
        return <RuminationSection thresholds={rumination} />;
      } else {
        return <TemperatureSection thresholds={temperature} />;
      }
    }
  };

  const handleActiveTab = (key) => {
    setShowHealthTab(key);
    if (key === "temperature") {
      setActiveTab(1);
    } else if (key === "heartbeat") {
      setActiveTab(2);
    } else if (key === "steps counter") {
      setActiveTab(3);
    } else if (key === "activity tracker") {
      setActiveTab(4);
    } else if (key === "rumination") {
      setActiveTab(5);
    } else {
      setActiveTab(1);
    }
  };

  return (
    <Stack mt={4} direction="column" alignItems="center" gap={4}>
      <TypographyPrimary
        sx={{ fontSize: "21px", alignSelf: "flex-start", m: 0 }}
      >
        Showing Health Data of{" "}
        <span style={{ color: "#B58B5D" }}>
          {getLongDateFormat(singleSelectedDate)}
        </span>
      </TypographyPrimary>
      <Stack width="100%" direction={"row"} flexWrap={"wrap"} gap={2}>
        {chartCardData
          ?.map((ele) => ({
            ...ele,
            value: data?.[ele?.label],
            createdAt: data?.[ele?.label?.toLowerCase() + "Time"],
            valueColor: getDynamicColor(data, ele?.label),
          }))
          ?.map((ele) => (
            <ChartCard
              label={ele.label}
              value={ele.value}
              icon={ele.icon}
              colors={ele.colors}
              valueColor={ele.valueColor}
              suffix={ele.suffix}
              createdAt={ele?.createdAt}
            />
          ))}
      </Stack>
      <BtnGroup
        btnData={btnData}
        activeBtn={showHealthTab}
        onChange={(ele) => handleActiveTab(ele)}
      />
      {showSection(showHealthTab)}
    </Stack>
  );
};

export default Health;
