import React, { useState, useEffect } from "react";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import { Breadcrumb, CustomTabs, BackdropLoader } from "../../../ComponentsV2";
import { Container } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import Overview from "./overview";
import { useParams } from "react-router-dom";
import AssignLivestock from "./assignLivestock";
import { request } from "../../../apis/axios-utils";
import useCollarContext from "../../../hooks/useCollarContext";

const ViewCollarDetails = () => {
  const [data, setData] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
    status: "online",
    networkStrength: "good",
    battery: "56%",
  });
  const { id } = useParams();
  const { openBackdropLoader, setOpenBackdropLoader,snackbarAlert,onSnackbarAlertClose } = useCollarContext();

  useEffect(() => {
    request({ url: `/devices/getDeviceByID?deviceID=${id}` })
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
          battery: `${data?.Battery}%`,
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
  }, []);

  const tabData = [
    {
      label: "overview",
      child: <Overview data={data} />,
    },
    {
      label: "assigned",
      child: <AssignLivestock data={data} />,
    },
    {
      label: "logs",
      child: <h1>Logs</h1>,
    },
  ];

  const BreadcrumbData = [
    {
      label: "collar management",
      link: "collars",
    },
    {
      label: data?.collarUid ? data.collarUid : "Collar UID",
      link: `collars/${data?.collarUid}`,
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
        <BackdropLoader open={openBackdropLoader} />
        <TypographyPrimary sx={{ textTransform: "capitalize", fontSize:21 }}>
          {data?.collarUid}
        </TypographyPrimary>
        <CustomTabs tabData={tabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default ViewCollarDetails;
