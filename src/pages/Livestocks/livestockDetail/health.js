import { Stack, Button } from "@mui/material";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../../ComponentsV2/themeComponents";
import { useState, useEffect } from "react";
import {
  ChartCard,
  BtnGroup,
  Skeleton,
  DownloadPDF,
  CustomModal,
} from "../../../ComponentsV2";
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
import ShowQRModalContent from "../../PDFPage/ShowQRModalContent";

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

const ShowLivestockQR = ({ collarId, pedometerId }) => {
  console.log(collarId, pedometerId, "vjjgjngjnbjngjngbjnjnj");
  return (
    <Stack direction={"row"} justifyContent={"center"}>
      <ShowQRModalContent id={collarId} title="Collar" />
      <ShowQRModalContent id={pedometerId} title="Pedometer" />
    </Stack>
  );
};

const Health = ({ data }) => {
  const [showHealthTab, setShowHealthTab] = useState("temperature");
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [modal, setModal] = useState(false);
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
    healthDataLoading,
  } = useLivestockHealthContext();
  const { cardData, threshold } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
    // const interval = setInterval(() => {
    //   getHealthCardData(id);
    //   getChartData(id);
    //   getLogs(id);
    // }, 60000);
    // return () => clearInterval(interval);
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

  const getAlertStatus = (ele) => {
    const status = cardData?.[ele?.label?.toLowerCase() + "AlertStatus"];
    return status === false ? "color-success--dark" : "err-color";
  };

  const getParameterCardDate = (ele) => {
    const date = cardData?.[ele?.label?.toLowerCase() + "Time"];
    if (date) {
      return formattedDate(date);
    } else {
      return "N/A";
    }
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
        <Stack direction="row" gap={2}>
          <ButtonPrimary
            disabled={showRefreshButton}
            variant="contained"
            sx={{ p: "5px 15px" }}
            onClick={handleRefresh}
          >
            Refresh
          </ButtonPrimary>
          <ButtonPrimary
            variant="contained"
            sx={{ p: "5px 15px" }}
            onClick={() => setModal(true)}
          >
            Show QR
          </ButtonPrimary>
        </Stack>
      </Stack>
      <Stack width="100%" direction={"row"} flexWrap={"wrap"} gap={2}>
        {chartCardData
          ?.map((ele) => ({
            ...ele,
            value: getCardValue(ele),
            createdAt: getParameterCardDate(ele),
            suffix: isActivity(ele)
              ? isHour(ele)
                ? " hr"
                : " min"
              : ele?.suffix,
            valueColor: getAlertStatus(ele),
          }))
          ?.map((ele) =>
            healthDataLoading ? (
              <Skeleton width={"19%"} height={"121px"} />
            ) : (
              <ChartCard
                label={ele.label}
                value={ele.value}
                icon={ele.icon}
                colors={ele.colors}
                valueColor={ele.valueColor}
                suffix={ele.suffix}
                createdAt={ele?.createdAt}
              />
            )
          )}
      </Stack>
      <BtnGroup
        btnData={btnData}
        activeBtn={showHealthTab}
        onChange={(ele) => handleActiveTab(ele)}
      />
      {showSection(showHealthTab)}
      {console.log(data, "hbhgbhhbhbhbhbhbh")}
      <CustomModal
        content={
          <ShowLivestockQR
            collarId={data?.collar?.macID}
            pedometerId={data?.pedometer?.macID}
          />
        }
        customWidth="45%"
        customWidthMd="70%"
        customWidthSm="90%"
        openModal={modal}
        handleClose={() => setModal(false)}
      />
    </Stack>
  );
};

export default Health;
