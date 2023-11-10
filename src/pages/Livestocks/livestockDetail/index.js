import React, { useEffect } from "react";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import { Breadcrumb, CustomTabs } from "../../../ComponentsV2";
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
import {alertsThresholdData} from "./alertThresholdData";

const LivestockDetails = () => {
  const [data, setData] = useState();
  const { snackbarAlert, onSnackbarAlertClose } = useLivestockContext();
  const [alertsThreshold, setAlertsThreshold] = useState([]);
  const { id } = useParams();

  useEffect(() => {
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
            steps: 5000,
            lastUpdate: data?.updatedAt,
            img: null,
            liveStocklocationStatus:data?.liveStocklocationStatus,
            collarId: data?.assignedDevice?._id,
            collarUid: data?.assignedDevice?.uID,
            collarWifiStatus: data?.assignedDevice?.wifiStatus,
            collarName: data?.assignedDevice?.deviceName,
            collarMacId: data?.assignedDevice?.macID,
            collarAddedOn: data?.assignedDevice?.createdAt,
            networkStrength: data?.assignedDevice?.networkStrength,
            battery: data?.assignedDevice?.battery,
            geolocation: data?.geolocation,
          };

          const thresholdFormattedData = alertsThresholdData?.map(ele => {
           return {
            ...ele,
            value:data?.threshold[ele.label]
           }
          });
          setAlertsThreshold(thresholdFormattedData)
          setData(formattedData);
        } else {
          throw new Error("something went wrong");
        }
      })
      .catch((e) => {
        // alert(e.message)
      });
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
      child: <Health data={data}/>,
    },
    {
      label: "alerts",
      child: <Alerts data={data} alertsThresholds={alertsThreshold} setAlertsThresholds={setAlertsThreshold} />,
    },
    {
      label: "collar",
      child: <CollarInfo data={data} />,
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
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <TypographyPrimary sx={{fontSize:21}}>{data?.Uid}</TypographyPrimary>
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default LivestockDetails;
