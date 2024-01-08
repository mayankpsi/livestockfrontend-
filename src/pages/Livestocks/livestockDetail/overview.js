import { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import LivestockInfo from "../../Collars/viewCollarDetails/livestockInfo";
import { TabPane, ParameterCard, StatusCard } from "../../../ComponentsV2";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { statusCardData, chartCardData } from "../Data";
import { useLivestockHealthContext } from "../../../context/LivestockHealthContext";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../hooks/useDateFormat";

const Overview = ({ data }) => {
  const { formattedDate } = useDateFormat();
  const { id } = useParams();
  const { healthCardData, getHealthCardData } = useLivestockHealthContext();
  const { cardData } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
  }, [id]);

  const isActivity = (ele) => ele?.label?.toLowerCase() === "activity";
  const isHour = (ele) => Number(cardData?.[ele?.label + "Hour"]) > 1;

  const getCardValue = (ele) => {
    return isActivity(ele)
      ? isHour(ele)
        ? cardData?.[ele?.label + "Hour"]?.toString()?.slice(0, 2)
        : cardData?.[ele?.label + "Min"]?.toString()?.slice(0, 2)
      : cardData?.[ele?.label];
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
    <Stack>
      <Stack
        mt={4}
        sx={{
          flexDirection: { lg: "row", md: "row" },
          paddingBottom: { sm: 4 },
        }}
        gap={4}
      >
        <Stack
          direction={"column"}
          gap={2}
          sx={{ width: { lg: "60%", md: "60%", sm: "100%" } }}
        >
          <LivestockInfo
            data={data}
            handelLivestockRemove={() => {}}
            btnBgColor="#86633E"
            onBtnClick={null}
          />
          <Stack
            className="bg-light-gray radius-10"
            sx={{ width: { lg: "100%", md: "100%", sm: "50%" } }}
            px={2}
            pb={2}
          >
            <TypographyPrimary>Device status</TypographyPrimary>
            <Stack direction="row" gap={2} width="100%">
              {statusCardData
                ?.map((ele) => {
                  const label = ele?.text?.toString()?.split(" ");
                  const device = label[0]?.toLowerCase();
                  const battery = label[1]?.toLowerCase() + "Percent";
                  return {
                    ...ele,
                    status: data ? `${data?.[device]?.[battery]}` : "",
                  };
                })
                ?.map((card) => (
                  <StatusCard
                    key={card.text}
                    text={card.text}
                    status={card.status}
                    icon={card.icon}
                    statusColor={card.statusColor}
                    suffix={card.suffix}
                  />
                ))}
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{
            width: { lg: "40%", md: "40%", sm: "100%" },
            flexDirection: { lg: "column", md: "column", sm: "row" },
            alignItems: { sm: "flex-start" },
            justifyContent: "space-between",
          }}
          gap={2}
        >
          <Stack
            sx={{ width: { lg: "100%", md: "100%", sm: "50%" } }}
            className="bg-light-gray radius-10"
            px={2}
            pb={2}
            direction="column"
            gap={2}
          >
            <TabPane
              text="Status"
              secondaryText={`Last Update : ${
                cardData?.livestockLocationStatusTime || "N/A"
              }`}
              btnText={cardData?.liveStocklocationStatus || "N/A"}
              hover={false}
              btnIcon={false}
              btnBgColor={
                cardData?.liveStocklocationStatus?.toLowerCase() === "safe"
                  ? "#47CD75"
                  : "#FF5C33"
              }
              onBtnClick={() => {}}
            />
            <Box display="flex" flexDirection="column" gap={2.7}>
              {chartCardData
                ?.map((ele) => ({
                  ...ele,
                  time: getParameterCardDate(ele),
                  value: getCardValue(ele),
                  suffix: isActivity(ele)
                    ? isHour(ele)
                      ? " hr"
                      : " min"
                    : ele?.suffix,
                  valueColor: getAlertStatus(ele),
                }))
                ?.map((ele) => (
                  <ParameterCard
                    label={ele.label}
                    time={ele.time}
                    value={ele.value}
                    icon={ele.icon}
                    colors={ele.colors}
                    valueColor={ele.valueColor}
                    suffix={ele.suffix}
                  />
                ))}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Overview;
