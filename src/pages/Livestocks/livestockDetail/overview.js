import React from "react";
import { Stack, Box } from "@mui/material";
import LivestockInfo from "../../Collars/viewCollarDetails/livestockInfo";
import { TabPane, ParameterCard, StatusCard } from "../../../ComponentsV2";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useGetColorDynamically from "../../../hooks/useGetColorDynamically";
import { statusCardData, parameterCardData } from "../Data";

const Overview = ({ data }) => {
  const { getCamelCase } = useGetCamelCase();
  const { getDynamicColor } = useGetColorDynamically();
  
  return (
    <Stack
      my={4}
      sx={{ flexDirection: { lg: "row", md: "row" }, paddingBottom: { sm: 4 } }}
      gap={4}
    >
      <Stack sx={{ width: { lg: "60%", md: "60%", sm: "100%" } }}>
        <LivestockInfo
          data={data}
          handelLivestockRemove={() => {}}
          btnBgColor="#86633E"
          onBtnClick={null}
        />
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
        >
          <TabPane
            text="Status"
            secondaryText={`Last Update : ${data?.lastUpdate}`}
            btnText={data?.liveStocklocationStatus || "N/A"}
            hover={false}
            btnIcon={false}
            btnBgColor={
              data?.liveStocklocationStatus?.toLowerCase() === "safe"
                ? "#47CD75"
                : "#FF5C33"
            }
            onBtnClick={() => {}}
          />
          <Box display="flex" flexDirection="column" gap={2}>
            {parameterCardData
              ?.map((ele) => ({
                ...ele,
                time: data?.lastUpdate,
                value: data ? data[getCamelCase(ele?.label)] : "",
                valueColor: getDynamicColor(data, ele?.label),
              }))
              ?.map((ele) => (
                <ParameterCard
                  label={ele.label}
                  time={ele.time}
                  value={ele.value}
                  icon={ele.icon}
                  iconBg={ele.iconBg}
                  valueColor={ele.valueColor}
                  suffix={ele.suffix}
                />
              ))}
          </Box>
        </Stack>
        <Stack
          className="bg-light-gray radius-10"
          sx={{ width: { lg: "100%", md: "100%", sm: "50%" } }}
          px={2}
          pb={2}
        >
          <TypographyPrimary>Collar status</TypographyPrimary>
          <Stack direction="column" gap={2}>
            {statusCardData
              ?.map((ele) => ({
                ...ele,
                status: data ? `${data[getCamelCase(ele?.text)]}` : "",
              }))
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
    </Stack>
  );
};

export default Overview;
