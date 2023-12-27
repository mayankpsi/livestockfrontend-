import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  TableV2,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
  Spinner,
} from "../../../../ComponentsV2";
import StepsChart from "../HealthCharts/StepsChart";
import HealthChartsModalContent from "../HealthCharts/HealthChartsModalContent";
import useGetColorDynamically from "../../../../hooks/useGetColorDynamically";
import useDateFormat from "../../../../hooks/useDateFormat";
import { TypographySecondary } from "../../../../ComponentsV2/themeComponents";
import { useParams } from "react-router-dom";
import {
  getFormattedHealthLogsData,
  exportFormat,
  logsTableHeadData,
} from "./dataFormats";
import { useLivestockHealthContext } from "../../../../context/LivestockHealthContext";

const StepsSection = ({thresholds}) => {
  const { id } = useParams();
  const {
    getLogs,
    healthLogData,
    handleLogsPaginationChange,
    logsDateRange,
    setLogsDateRange,
    chartDataLoader,
    getChartData,
    activeTab,
    chartDateRange, setChartDateRange,
    healthChartData: chartData,
  } = useLivestockHealthContext();
  //DESTRUCTING LOGS DATA
  const { logsData, logsDataLength, pagination, loading } = healthLogData;

  useEffect(() => {
    getLogs(id);
  }, [pagination, logsDateRange, activeTab]);

  useEffect(() => {
    getChartData(id);
  }, [id, chartDateRange, activeTab]);
  return (
    <Stack width="100%" direction={"column"} gap={5}>
      <Stack width="100%">
        <HealthChartsModalContent
          dateRange={true}
          selectedDate={chartDateRange}
          label={"Steps Counter"}
          setSelectedDate={setChartDateRange}
        >
          {chartDataLoader ? (
            <Stack height={500}>
              <Spinner />
            </Stack>
          ) : (
            <StepsChart data={chartData} height={500} thresholds={thresholds}/>
          )}
        </HealthChartsModalContent>
      </Stack>
      <Stack width="100%" direction={"column"} gap={3}>
        <Box>
          <TabPaneV2
            paneText="Steps Counter"
            paneTextColor="#000"
            datePicker={true}
            btnDisabled={logsDataLength ? false : true}
            btnText={
              logsDataLength ? (
                <ExportAsCSV
                  headers={logsTableHeadData?.map((ele) =>
                    ele === "Date & Time" ? "date" : ele
                  )}
                  data={exportFormat(logsData, "step counter")}
                  fileName="logs"
                >
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={() => {}}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={logsDateRange}
            setSelectedDate={setLogsDateRange}
          />
          <TypographySecondary sx={{ fontSize: "16px" }}>{`showing ${
            logsDataLength < 10 ? logsDataLength : 10
          } out of ${logsDataLength} Logs`}</TypographySecondary>
        </Box>
        {loading ? (
          <Stack height={"600px"}>
            <Spinner />
          </Stack>
        ) : logsDataLength ? (
          <Box>
            <TableV2
              btnColor="#fff"
              btnBg="#B58B5D"
              tableHeadData={logsTableHeadData}
              tableRowData={getFormattedHealthLogsData(
                logsData,
                "steps",
                "/hr"
              )}
            />
            {logsDataLength > 10 ? (
              <Stack direction="row" justifyContent="center" pt={3}>
                <CustomPagination
                  size="large"
                  count={Math.ceil(logsDataLength / 10)}
                  page={pagination}
                  onPageChange={handleLogsPaginationChange}
                />
              </Stack>
            ) : null}
          </Box>
        ) : (
          <NoData />
        )}
      </Stack>
    </Stack>
  );
};

export default StepsSection;
