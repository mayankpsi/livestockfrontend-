import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import {
  TabPaneV2,
  TableV2,
  CustomPagination,
  NoData,
  ExportAsCSV,
  TableSkeleton,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { request } from "../../../apis/axios-utils";
import useGetColorDynamically from "../../../hooks/useGetColorDynamically";
import { TableTypography } from "../../../ComponentsV2/themeComponents";
import useErrorMessage from "../../../hooks/useErrorMessage";

const LivestockLogs = ({ livestockData }) => {
  const tableHeaders = ["name", "value", "time"];
  const { getErrorMessage } = useErrorMessage();

  const {
    selectedDate,
    setSelectedDate,
    openSnackbarAlert,
    openBackdropLoader,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate } = useDateFormat();
  const [livestockLogs, setLivestockLogs] = useState();
  const [dataLength, setDataLength] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  //GET ALL ALERTS THRESHOLD
  useEffect(() => {
    if (livestockData?.id) {
      setOpenBackdropLoader(true);
      request({
        url: `/liveStock/getLivestockLog?livestock_id=${
          livestockData?.id
        }&page=${paginationPageNo}&limit=10&startDate=${paginationDateFormat(
          selectedDate[0]?.startDate
        )}&endDate=${paginationDateFormat(selectedDate[0]?.endDate)}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { data } = res?.data;
            const formattedData = [];
            data?.data?.forEach((ele) => {
              const keys = Object.keys(ele);
              keys?.forEach((key) => {
                const checkFor =
                  key === "address" ||
                  key === "heartBeat" ||
                  key === "rumination" ||
                  key === "steps" ||
                  key === "temperature";
                if (checkFor) {
                  formattedData.push({
                    name: key,
                    value: ele[key],
                    time: formattedDate(ele.createdAt),
                    alertValue: ele.alertStatus,
                  });
                }
              });
            });
            setLivestockLogs(formattedData);
            setDataLength(data?.dataLength);
            setPageCount(data?.pageCount);
          } else {
            const msg = getErrorMessage(res);
            setLivestockLogs([]);
            setDataLength(0);
            setPageCount(1);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          const firstLoad =
            paginationDateFormat(new Date()) ===
              paginationDateFormat(selectedDate[0]?.startDate) &&
            paginationDateFormat(new Date()) ===
              paginationDateFormat(selectedDate[0]?.endDate);
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [livestockData?.id, selectedDate, paginationPageNo]);

  const handleSnackBarAlert = () => {
    if (!dataLength) {
      openSnackbarAlert("error", "Nothing to Export");
    }
  };

  return (
    <Box>
      <Stack sx={{ width: "100%", pb: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText="Manage Log"
            paneTextColor="#000"
            datePicker={true}
            clearBtn={false}
            onClearAll={() => {}}
            btnText={
              dataLength > 0 ? (
                <ExportAsCSV
                  headers={tableHeaders}
                  data={livestockLogs}
                  fileName="livestock-logs"
                >
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={handleSnackBarAlert}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        {openBackdropLoader ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(3).fill("28")}
          />
        ) : dataLength ? (
          <TableV2
            tableHeadData={tableHeaders}
            tableRowData={livestockLogs?.map((ele) => ({
              name: ele?.name,
              value: [
                <TableTypography
                  sx={{
                    color:
                      ele?.alertValue || ele?.locationStatus === "unsafe"
                        ? "#FC5555"
                        : null,
                  }}
                >
                  {ele?.value}
                </TableTypography>,
              ],
              time: ele?.time,
            }))}
            logs={livestockLogs}
          />
        ) : null}
      </Stack>
      {!openBackdropLoader && livestockLogs?.length ? (
        dataLength > 10 && (
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              page={paginationPageNo}
              count={pageCount}
              onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default LivestockLogs;
