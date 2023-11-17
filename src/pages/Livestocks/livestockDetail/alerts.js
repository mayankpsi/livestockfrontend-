import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import {
  AlertCard,
  TableV2,
  TabPaneV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
} from "../../../ComponentsV2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { request } from "../../../apis/axios-utils";
import {livestockDetailAlertTableHeadData} from "../Data";


const Alerts = ({ data, alertsThresholds, setAlertsThresholds }) => {
  const {
    tempThreshold,
    handleLivestockTempAlertsChange,
    isLivestockTempAlertsEdit,
    serIsLivestockTempAlertsEdit,
    heartbeatThreshold,
    isLivestockHeartbeatAlertsEdit,
    setIsLivestockHeartbeatAlertsEdit,
    geofenceThreshold,
    isLivestockGeofenceAlertsEdit,
    setIsLivestockGeofenceAlertsEdit,
    handleLivestockHeartbeatAlertsChange,
    handleLivestockGeofenceAlertsChange,
    humidityThreshold,
    handleLivestockHumidityAlertsChange,
    isLivestockHumidityAlertsEdit,
    setIsLivestockHumidityAlertsEdit,
    selectedDate,
    setSelectedDate,
    paginationPageNo,
    setPaginationPageNo,
    pageCount,
    setPageCount,
    pageLimit,
    handleAlertDelete,
    openSnackbarAlert,
    setOpenBackdropLoader,
    alertsDataLength, setAlertsDataLength
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate } = useDateFormat();
  const [singleLivestockAlerts, setSingleLivestockAlerts] = useState([]);


  useEffect(() => {
    setOpenBackdropLoader(true);
    if (data?.id) {
      request({
        url: `/liveStock/getSingleLiveStockAllAlerts?liveStockID=${
          data?.id
        }&startDate=${paginationDateFormat(
          selectedDate[0]?.startDate
        )}&endDate=${paginationDateFormat(
          selectedDate[0]?.endDate
        )}&page=${paginationPageNo}&limit=${pageLimit}`,
      })
        .then((res) => {
          if (
            res.status === 200 &&
            res?.data?.data?.LiveStockAlertData?.length
          ) {
            const { data } = res.data;
            const formattedData = data?.LiveStockAlertData?.map((ele) => ({
              id: ele?._id,
              alertName: ele?.message,
              thresholdValue: ele?.thresholdValue,
              alarmValue: ele?.alertValue,
              time: formattedDate(ele?.createdAt, "time"),
              date: formattedDate(ele?.createdAt, "date"),
            }));
            setSingleLivestockAlerts(formattedData);
            setPageCount(data?.totalPage);
            setAlertsDataLength(data?.dataLength);
          } else {
            const msg = res?.data?.data?.LiveStockAlertData?.length
              ? "something went wrong"
              : "No data found";
            setSingleLivestockAlerts([]);
            setPageCount(1);
            setAlertsDataLength(0);
            throw new Error(msg);
          }
        })
        .catch((err) => openSnackbarAlert("error", err.message))
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [data?.id, paginationPageNo, selectedDate]);

  useEffect(() => {
    setPaginationPageNo(1);
  }, [selectedDate]);

  const handleThresholdEdit = (id) => {
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          isEdit: !ele?.isEdit,
        };
      } else return ele;
    });

    setAlertsThresholds(updatedData);
  };

  const handleThresholdChange = (event, id) => {
    const { name, value } = event?.target;
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          value: {
            ...ele.value,
            [name]: value,
          },
        };
      } else return ele;
    });
    setAlertsThresholds(updatedData);
  };

  const handleThresholdAlertSubmit = async (id) => {
    const body = {};

    alertsThresholds?.forEach((el) => {
      body[el.label] = el.value;
    });
    setOpenBackdropLoader(true);
    try {
      if (data?.id) {
        const res = await request({
          url: `/liveStock/updateLiveStockThreshold?liveStockId=${data?.id}`,
          method: "PATCH",
          data: body,
        });
        if (res?.status === 200) {
          openSnackbarAlert("success", "Threshold successfully updated");
        } else {
          throw new Error("Something went wrong");
        }
        setOpenBackdropLoader(false);
      }
    } catch (error) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", error?.message);
    }
    handleThresholdEdit(id);
  };

  const handleSnackBarAlert = () => {
    console.log(alertsDataLength,"dchbdcvgvgvdg")
    if(!alertsDataLength){
      openSnackbarAlert("error","Nothing to Export")
    }
  }


  return (
    <Stack mt={4}>
      <Stack direction="row" flexWrap="wrap" width="100%" gap={3}>
        {alertsThresholds?.map((ele) => (
          <AlertCard
            key={ele?.id}
            paneText={`set ${ele?.label} threshold`}
            label={ele?.label}
            valueSuffix={ele?.suffix}
            labelData={ele?.value}
            isEdit={ele?.isEdit}
            onChange={(event) => handleThresholdChange(event, ele?.id)}
            onBtnClick={() =>
              ele?.isEdit
                ? handleThresholdAlertSubmit(ele?.id)
                : handleThresholdEdit(ele?.id)
            }
          />
        ))}
      </Stack>
      <Stack sx={{ width: "100%", py: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText={`showing ${
              alertsDataLength < 10 ? alertsDataLength : 10
            } out of ${alertsDataLength} Alerts`}
            paneTextColor="#000"
            datePicker={true}
            clearBtn={true}
            onClearAll={() => handleAlertDelete(data?.id, "deleteAllAlerts")}
            btnText={alertsDataLength?
              <ExportAsCSV
                headers={livestockDetailAlertTableHeadData}
                data={singleLivestockAlerts}
                fileName="alerts"
              >
                Export
              </ExportAsCSV>:"Export"
            }
            onBtnClick={handleSnackBarAlert}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        <TableV2
          paneText="showing 10 out of 20 Alerts"
          paneTextColor="#000"
          isBtn={true}
          btnText="export"
          datePicker={true}
          btnColor="#fff"
          btnBg="#B58B5D"
          tableHeadData={livestockDetailAlertTableHeadData}
          tableRowData={singleLivestockAlerts
            .map((ele) => ({
              ...ele,
              action: [
                <DeleteOutlineOutlinedIcon
                  fontSize="large"
                  onClick={() => handleAlertDelete(ele.id)}
                />,
              ],
            }))
            .map((ele) => {
              delete ele.id;
              return ele;
            })}
        />
        {singleLivestockAlerts?.length ? (
          alertsDataLength > 10 ? (
            <Stack direction="row" justifyContent="center" pt={5}>
              <CustomPagination
                size="large"
                count={pageCount}
                page={paginationPageNo}
                onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
              />
            </Stack>
          ) : null
        ) : (
          <NoData />
        )}
      </Stack>
    </Stack>
  );
};

export default Alerts;
