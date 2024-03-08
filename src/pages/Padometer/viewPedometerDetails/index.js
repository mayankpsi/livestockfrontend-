import React, { useState, useEffect } from "react";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import { CustomTabs, BackdropLoader, Skeleton} from "../../../ComponentsV2";
import { Container } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useParams } from "react-router-dom";
import { request } from "../../../apis/axios-utils";
import useCollarContext from "../../../hooks/useCollarContext";
import {
  viewCollarDetailTabData,
  viewCollarDetailsBreadcrumbData,
} from "../Data";

const ViewPedometerDetails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    collarUid: "",
    collarName: "",
    collarMacId: "",
    status: "online",
    networkStrength: "good",
    battery: "56%",
  });
  const { id } = useParams();
  const {
    openBackdropLoader,
    setOpenBackdropLoader,
    snackbarAlert,
    onSnackbarAlertClose,
  } = useCollarContext();

  useEffect(() => {
    setOpenBackdropLoader(true)
    request({ url: `/devices/getDeviceByID?deviceID=${id}`})
      .then((res) => {
        const { data } = res?.data;
        let formattedData = {
          collarId: data?._id,
          livestockId: data?.liveStock?._id,
          collarUid: data?.uID,
          collarName: data?.deviceName,
          collarMacId: data?.macID,
          status: data?.status ? "online" : "offline",
          networkStrength: data?.NetworkStrength,
          pedometerBattery: data?.batteryPercent,
          collarBattery:data?.collarBattery, 
          Uid: data?.liveStock?.uID,
          name: data?.liveStock?.name,
          gender: data?.liveStock?.gender,
          img: data?.liveStock?.imgPath,
        };
        setData(formattedData);
      })
      .catch((e) => {
        // alert(e.message)
      })
      .finally(() => setOpenBackdropLoader(false));
  }, [loading]);

  return (
    <AdminUIContainer
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={viewCollarDetailsBreadcrumbData(data)}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8, pb: 5 }}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        {
          openBackdropLoader?(
            <Skeleton width="77.5vw" height={'65px'} sx={{background:"#F7F8FD"}}/>
          ):(
            <TypographyPrimary sx={{ textTransform: "capitalize", fontSize: 21 }}>
          {data?.collarUid}
        </TypographyPrimary>
          )
        }
        <CustomTabs tabData={viewCollarDetailTabData(data, loading, setLoading)} />
      </Container>
    </AdminUIContainer>
  );
};

export default ViewPedometerDetails;
