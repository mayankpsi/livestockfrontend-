import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import {
  TabPaneV2,
  TableV2,
  CustomPagination,
  NoData,
  ExportAsCSV,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { request } from "../../../apis/axios-utils";

const LivestockLogs = ({ data }) => {
  const tableHeaders = ["name", "value", "time"];

  const {
    selectedDate,
    setSelectedDate,
    openSnackbarAlert,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { paginationDateFormat } = useDateFormat();
  const [livestockLogs, setLivestockLogs] = useState();
  const [dataLength, setDataLength] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  //GET ALL ALERTS THRESHOLD
  useEffect(() => {
    if (data?.id) {
      setOpenBackdropLoader(true);
      request({
        url: `/liveStock/getLivestockLog?livestock_id=${
          data?.id
        }&page=${paginationPageNo}&limit=2&startDate=${paginationDateFormat(
          selectedDate[0]?.startDate
        )}&endDate=${paginationDateFormat(selectedDate[0]?.startDate)}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const { data } = res?.data;
            const formattedData = [];
            data?.data?.forEach(ele => {
              const keys = Object.keys(ele);
              keys?.forEach(key => {
                const checkFor = key === "address" || key === "heartBeat" || key === "rumination" || key === "steps" || key === "temperature";
                if(checkFor){
                  formattedData.push({
                    name: key,
                    value: ele[key],
                    time: paginationDateFormat(ele.createdAt),
                  })
                }
              })
            })
            setLivestockLogs(formattedData);
            setDataLength(data?.dataLength);
            setPageCount(data?.pageCount);
          } else {
            const msg = res?.response?.data?.message || "Something went wrong!";
            setLivestockLogs([]);
            setDataLength(0);
            setPageCount(1)
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
  }, [data?.id, selectedDate, paginationPageNo]);

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
                <ExportAsCSV headers={tableHeaders} data={livestockLogs} fileName="livestock-logs">
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
        <TableV2 tableHeadData={tableHeaders} tableRowData={livestockLogs} />
      </Stack>
      {livestockLogs?.length ? (
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
