import React, { useEffect } from "react";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import { CustomTabs, BackdropLoader } from "../../../ComponentsV2";
import { Container } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Overview from "./overview";
import Location from "./location";
import Health from "./health";
import Alerts from "./alerts";
import CollarInfo from "./collarInfo";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { alertsThresholdData } from "./alertThresholdData";
import useDateFormat from "../../../hooks/useDateFormat";
import LivestockLogs from "./LivestockLogs";

const LivestockDetails = () => {
  const [data, setData] = useState();
  const {
    snackbarAlert,
    openBackdropLoader,
    onSnackbarAlertClose,
    alertDeletedId,
    handleAllAlertDeleteConfirm,
    showConfirmModal,
    handleConfirmWindowClose,
    handleAlertDeleteConfirm,
    setOpenBackdropLoader,
    openSnackbarAlert,
  } = useLivestockContext();
  const { formattedDate } = useDateFormat();
  const [alertsThreshold, setAlertsThreshold] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setOpenBackdropLoader(true);
    // lastUpdateGeoFenceDependent: formattedDate(data?.updatedAt),
    // lastUpdateDeviceDependent:formattedDate(data?.updated_At),
    request({ url: `/liveStock/getLiveStockByID/?liveStockID=${id}` })
      .then((res) => {
        if (res?.data?.data && res?.data?.statusCode === 200) {
          const { data } = res?.data;
          let formattedData = {
            id: data?._id,
            Uid: data?.uID,
            name: data?.name,
            gender: data?.gender,
            status: data?.status,
            temperature: data?.temperature,
            heartbeat: data?.heartBeat,
            steps: data?.steps,
            rumination: data?.rumination,
            lastUpdate: formattedDate(data?.updatedAt),
            img: data?.imgPath,
            liveStocklocationStatus: data?.liveStocklocationStatus,
            collarId: data?.assignedDevice?._id,
            collarUid: data?.assignedDevice?.uID,
            collarWifiStatus: data?.assignedDevice?.wifiStatus,
            collarName: data?.assignedDevice?.deviceName,
            collarMacId: data?.assignedDevice?.macID,
            collarAddedOn: data?.assignedDevice?.createdAt,
            networkStrength: data?.assignedDevice?.networkStrength,
            battery: data?.assignedDevice?.battery,
            geolocation: data?.geolocation,
            thresholds: data?.threshold,
          };
          setData(formattedData);
          const thresholdFormattedData = alertsThresholdData?.map((ele) => {
            return {
              ...ele,
              value: data?.threshold[ele.label],
            };
          });
          setAlertsThreshold(thresholdFormattedData);
        } else {
          throw new Error("something went wrong");
        }
      })
      .catch((e) => {
        openSnackbarAlert("error", e.message);
      })
      .finally(() => setOpenBackdropLoader(false));
  }, []);

  const tabData = [
    {
      label: "overview",
      child: <Overview data={data} />,
    },
    {
      label: "location",
      child: <Location data={data} />,
    },
    {
      label: "health",
      child: <Health data={data} />,
    },
    {
      label: "alerts",
      child: (
        <Alerts
          data={data}
          alertsThresholds={alertsThreshold}
          setAlertsThresholds={setAlertsThreshold}
        />
      ),
    },
    {
      label: "collar",
      child: <CollarInfo data={data} />,
    },
    {
      label: "Logs",
      child: <LivestockLogs livestockData={data} />,
    },
  ];

  const BreadcrumbData = [
    {
      label: "livestocks",
      link: "livestocks",
    },
    {
      label: data?.Uid ? data.Uid : "Collar UID",
      link: `livestocks/${data?.Uid}`,
    },
  ];

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={
        alertDeletedId?.type === "deleteAllAlerts"
          ? handleAllAlertDeleteConfirm
          : handleAlertDeleteConfirm
      }
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8, pb: 5 }}>
        <BackdropLoader open={openBackdropLoader} />
        <TypographyPrimary sx={{ fontSize: 21 }}>{data?.Uid}</TypographyPrimary>
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default LivestockDetails;
