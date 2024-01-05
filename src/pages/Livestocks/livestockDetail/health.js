import { Stack, Button } from "@mui/material";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../../ComponentsV2/themeComponents";
import { useState, useEffect } from "react";
import { ChartCard, BtnGroup } from "../../../ComponentsV2";
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
  // {
  //   label: "activity tracker",
  // },
  {
    label: "rumination",
  },
];

const Health = ({ data }) => {
  const [showHealthTab, setShowHealthTab] = useState("temperature");
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const { id } = useParams();
  const { formattedDate } = useDateFormat();
  const { getDynamicColor } = useGetColorDynamically();
  const {
    setActiveTab,
    getHealthCardData,
    healthCardData,
    handleRefreshButton,
    getChartData,
    getLogs,
  } = useLivestockHealthContext();
  const { cardData, threshold } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
    // setInterval(() => {
    //   getHealthCardData(id);
    //   getChartData(id);
    //   getLogs(id);
    // }, 60000);
  }, [id]);

  const showSection = (key) => {
    const { heartBeat, rumination, temperature, steps, activity } = threshold;
    if (key === "temperature") {
      return <TemperatureSection thresholds={temperature} />;
    } else if (key === "heartbeat") {
      return <HeartbeatSection thresholds={heartBeat} />;
    } else if (key === "steps counter") {
      return <StepsSection thresholds={steps} />;
    } else if (key === "activity tracker") {
      return <ActivitySection thresholds={activity} />;
    } else if (key === "rumination") {
      return <RuminationSection thresholds={rumination} />;
    } else {
      return <TemperatureSection thresholds={temperature} />;
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
  const isHour = (ele) => Number(cardData?.[ele?.label + "Hour"]) > 1;

  const getCardValue = (ele) => {
    return isActivity(ele)
      ? isHour(ele)
        ? cardData?.[ele?.label + "Hour"]?.toString()?.slice(0, 2)
        : cardData?.[ele?.label + "Min"]?.toString()?.slice(0, 2)
      : cardData?.[ele?.label];
  };

  const handleDisableButton = () => {
    setShowRefreshButton(true);
    setTimeout(() => {
      setShowRefreshButton(false);
    }, 30000);
  };

  const handleRefresh = () => {
    handleDisableButton();
    handleRefreshButton(id);
  };

  return (
    <Stack mt={4} direction="column" alignItems="center" gap={4}>
      <Stack
        width="100%"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TypographyPrimary sx={{ fontSize: "21px", m: 0 }}>
          Showing Health Data
        </TypographyPrimary>
        <ButtonPrimary
          disabled={showRefreshButton}
          variant="contained"
          sx={{ p: "5px 15px" }}
          onClick={handleRefresh}
        >
          Refresh
        </ButtonPrimary>
      </Stack>
      <Stack width="100%" direction={"row"} flexWrap={"wrap"} gap={2}>
        {chartCardData
          ?.map((ele) => ({
            ...ele,
            // value: getCardValue(ele),
            createdAt: formattedDate(
              cardData?.[ele?.label?.toLowerCase() + "Time"]
            ),
            // valueColor: getDynamicColor(data, ele?.label),
            suffix: isActivity(ele)
              ? isHour(ele)
                ? " hr"
                : " min"
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
