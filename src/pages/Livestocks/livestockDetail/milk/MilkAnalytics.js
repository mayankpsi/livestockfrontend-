import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { ParameterCard, Skeleton, TabPane } from "../../../../ComponentsV2";
import useGetMilkAnalyticsData from "./hooks/useGetMilkAnalyticsData";
import { milkAnalyticsCardData } from "./Data";
import MilkAnalyticsChart from "./MilkAnalyticsChart";
import { useParams } from "react-router-dom";
import useGetLactationPeriod from "./hooks/useGetLactationPeriod";
import useDateFormat from "../../../../hooks/useDateFormat";
import { ordinalNumber } from "../../../../Role/Admin/UserManagemnet/utils/utils";

const MilkAnalytics = () => {
  const { id } = useParams();
  const { paginationDateFormat } = useDateFormat();
  const [lactationValue, setLactationValue] = useState("1");
  const { isLoading, error, data } = useGetMilkAnalyticsData(
    id,
    lactationValue
  );

  const getPreviousDate = (days) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    return nextDate.setDate(currentDate.getDate() - days);
  };

  const chartDummyData = () => {

    const data = Array.from({ length: 7 }, (_, ind) => ({
      label: paginationDateFormat(getPreviousDate(ind)),
      entryQuantity: 0,
    }));

    return data?.toReversed();
  };

  return (
    <Stack width="100%">
      <Box width={"100%"}>
        <TabPane
          text={"milk production analytics"}
          minWidth="18rem"
          selectValue={
            data?.overviewData?.interCalvingDataLength ? lactationValue : false
          }
          selectOptions={Array.from(
            { length: Number(data?.overviewData?.interCalvingDataLength) },
            (_, ind) => {
              return {
                label: `${ordinalNumber(ind + 1)} Lactation`,
                value: ind + 1,
              };
            }
          )}
          onSelectChange={(value) => setLactationValue(value)}
        />
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        flexWrap={"wrap"}
        sx={{ py: 2 }}
      >
        {isLoading ? (
          <>
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
          </>
        ) : (
          milkAnalyticsCardData?.map((ele) => (
            <ParameterCard
              label={ele.label}
              value={data?.overviewData?.[ele?.key]}
              icon={ele.icon}
              colors={ele.colors}
              suffix={""}
            />
          ))
        )}
      </Stack>
      {isLoading ? (
        <Skeleton width={"100%"} height={"40vh"} />
      ) : (
        <Paper
          sx={{ border: "1px solid rgba(0,0,0,0.1)", pt: 5, pb: 3, pr: 5 }}
        >
          <MilkAnalyticsChart
            height={400}
            data={data?.data?.length?data?.data: chartDummyData()}
          />
        </Paper>
      )}
    </Stack>
  );
};

export default MilkAnalytics;
