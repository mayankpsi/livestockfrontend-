import React, { useEffect } from "react";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import { CustomTabs, BackdropLoader, Skeleton } from "../../../ComponentsV2";
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
import useErrorMessage from "../../../hooks/useErrorMessage";

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
  const [collarLoading, setCollarLoading] = useState(false);
  const [livestockEditLoading,setLivestockEditLoading ] = useState(false)
  const [pedometerLoading, setPedometerLoading] = useState(false);
  const [alertsThreshold, setAlertsThreshold] = useState([]);
  const { id } = useParams();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    setOpenBackdropLoader(true);
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
            lastUpdateGeoFenceDependent: formattedDate(
              data?.livestockLocationStatusTime || data?.createdAt
            ),
            lastUpdateDeviceDependent: formattedDate(
              data?.livestockLocationStatusTime
            ),
            img: data?.imgPath,
            liveStocklocationStatus: data?.liveStocklocationStatus,
            collar: data?.assignedDevice?.collarDevice,
            pedometer: data?.assignedDevice?.pedometerDevice,
            collarId: data?.assignedDevice?._id,
            collarUid: data?.assignedDevice?.uID,
            collarWifiStatus: data?.assignedDevice?.wifiStatus,
            collarName: data?.assignedDevice?.deviceName,
            collarMacId: data?.assignedDevice?.macID,
            collarAddedOn: data?.assignedDevice?.createdAt,
            networkStrength: data?.assignedDevice?.networkStrength,
            pedometerBattery: data?.assignedDevice?.pedometerBattery,
            collarBattery: data?.assignedDevice?.collarBattery,
            geolocation: data?.geolocation,
            thresholds: data?.threshold,
          };
          setData(formattedData);
        } else {
          throw new Error(getErrorMessage(res));
        }
      })
      .catch((e) => {
        openSnackbarAlert("error", e.message);
      })
      .finally(() => {
        setOpenBackdropLoader(false);
      });
  }, [collarLoading, pedometerLoading, livestockEditLoading]);

  const tabData = [
    {
      label: "overview",
      child: <Overview data={data} setLivestockEditLoading={setLivestockEditLoading}/>,
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
      label: "Device",
      child: (
        <CollarInfo
          data={data}
          collarLoading={collarLoading}
          setCollarLoading={setCollarLoading}
          pedometerLoading={pedometerLoading}
          setPedometerLoading={setPedometerLoading}
        />
      ),
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
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        {openBackdropLoader ? (
          <Skeleton
            width="77.5vw"
            height={"59px"}
            sx={{ background: "#F7F8FD" }}
          />
        ) : (
          <TypographyPrimary sx={{ fontSize: 21 }}>
            {data?.Uid}
          </TypographyPrimary>
        )}

        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default LivestockDetails;
