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
  const tableHeaders = ["name", "value", "date & time"];
  const tableRows = [
    {
      name: "temperature sensor",
      value: "101 F",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "heartbeat sensor",
      value: "80",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "temperature sensor",
      value: "101 F",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "heartbeat sensor",
      value: "80",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "temperature sensor",
      value: "101 F",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "heartbeat sensor",
      value: "80",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "temperature sensor",
      value: "101 F",
      dateAndTime: "10:59 PM, 23/08/23",
    },
    {
      name: "heartbeat sensor",
      value: "Dixon Technologies India Ltd Plot No 06 Sect 90, Sector 90",
      dateAndTime: "10:59 PM, 23/08/23",
    },
  ];

  const {
    paginationPageNo,
    selectedDate,
    setSelectedDate,
    openSnackbarAlert,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { paginationDateFormat } = useDateFormat();
  const [livestockLogs, setLivestockLogs] = useState();

  //GET ALL ALERTS THRESHOLD
  useEffect(() => {
    if (data?.id) {
      setOpenBackdropLoader(true);
      request({
        url: `/liveStock/getLivestockLog?livestock_id=${
          data?.id
        }&page=${paginationPageNo}&limit=10&startDate=${paginationDateFormat(
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
                    dateAndTime: paginationDateFormat(ele.createdAt),
                  })
                }
              })
            })
            setLivestockLogs(formattedData);
          } else {
            const msg = res?.response?.data?.message || "Something went wrong!";
            setLivestockLogs([]);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          const firstLoad =
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate, "date") &&
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate, "date");
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [data?.id, selectedDate]);
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
              0 ? (
                <ExportAsCSV headers={tableHeaders} data={[]} fileName="alerts">
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={() => {}}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        <TableV2 tableHeadData={tableHeaders} tableRowData={livestockLogs} />
      </Stack>
      {livestockLogs?.length ? (
        0 > 10 && (
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              page={1}
              count={1}
              onPageChange={(pageNo) => {}}
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
