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
import { useParams } from "react-router-dom";

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
  const { id } = useParams();
  const { getLongDateFormat, formattedDate } = useDateFormat();
  const { getDynamicColor } = useGetColorDynamically();
  const {
    healthChartData,
    activeTab,
    setActiveTab,
    getHealthCardData,
    healthCardData,
  } = useLivestockHealthContext();

  const [singleSelectedDate, setSingleSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    getHealthCardData(id);
  }, [id]);

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

  const isActivity = (ele) => ele?.label?.toLowerCase() === "activity";
  const isHour = (ele) => Number(healthCardData?.[ele?.label + "Hour"]) > 1;

  const getCardValue = (ele) => {
    return isActivity(ele)
      ? isHour(ele)
        ? healthCardData?.[ele?.label + "Hour"]?.toString()?.slice(0, 2)
        : healthCardData?.[ele?.label + "Min"]?.toString()?.slice(0, 2)
      : healthCardData?.[ele?.label];
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
            value: getCardValue(ele),
            createdAt: formattedDate(
              healthCardData?.[ele?.label?.toLowerCase() + "Time"]
            ),
            valueColor: getDynamicColor(data, ele?.label),
            suffix: isActivity(ele)
              ? isHour(ele)
                ? "/hr"
                : "/min"
              : ele?.suffix,
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
