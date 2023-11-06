import { useState, useEffect } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { GetMap, DashboardCard, CustomModal, BackdropLoader} from "../../ComponentsV2";
import { AddCircleOutlineOutlinedIcon } from "../../icons";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../ComponentsV2/themeComponents";
import ModalContent from "./ModalContent";
import { DashboardNoData } from "../../assets";
import { useTheme } from "@emotion/react";
import useCollarContext from "../../hooks/useCollarContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../apis/axios-utils";
import { deviceData } from "./Data";

const AdminDashBoard = () => {
  const theme = useTheme();

  const handleCompleteProfileModal =
    localStorage.getItem("showProfileCompleteModal") === "true";
  const { handleCollarModalOpen } = useCollarContext();

  const setHandleCompleteProfileModal = () => {
    localStorage.removeItem("showProfileCompleteModal");
  };
  const navigate = useNavigate();

  const userName = JSON.parse(
    localStorage.getItem("userData")
  )?.userName?.split(" ")[0];
  const firstName = userName?.charAt(0)?.toUpperCase() + userName?.slice(1);
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    totalCollars: 0,
    totalLiveStock: 0,
    totalSafeLiveStock: 0,
    totalUnSafeLiveStock: 0,
    totalAlerts: 0,
    geolocationLat: 0,
    geolocationLng: 0,
    geolocationRadius: 0,
  });

  useEffect(() => {
    setOpenBackdropLoader(true);
    Promise.all([
      request({
        url: "/user/getAllRecords",
      }),
      request({ url: "/devices/isDeviceWithInGeofence" }),
    ])
      .then((res) => {
        console.log(res,"sjxbhxbvsxgvxsgv")
        const [res1, res2] = res;
        if (res1?.status === 200) {
          const { data } = res1?.data;
          const formattedData = {
            totalCollars: data?.TotalDevice,
            totalLiveStock: data?.TotalLiveStock,
            totalSafeLiveStock: data?.TotalSafeLiveStock,
            totalUnSafeLiveStock: data?.TotalUnSafeLiveStock,
            totalAlerts: data?.AllAlertsCount[0]?.totalAlerts,
            geolocationLat: data?.GeofenceData?.lat,
            geolocationLng: data?.GeofenceData?.lng,
            geolocationRadius: data?.GeofenceData?.radius,
          };
          setDashboardData(formattedData);
        } else {
          throw new Error("something went wrong");
        }
        if (res2?.status === 200) {
          const { data } = res2?.data;
          const formattedData = data?.map((ele) => ({
            id: ele?.liveStockId,
            position: {
              lat: ele?.location?.latitude,
              lng: ele?.location?.longitude,
            },
          }));
          setGetLivestockStatus(formattedData);
        } else {
          throw new Error("something went wrong");
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false))
  }, []);

  return (
    <>
      <AdminUIContainer>
        <BackdropLoader open={openBackdropLoader} />
        <CustomModal
          content={
            <ModalContent setHandleModal={setHandleCompleteProfileModal} />
          }
          openModal={handleCompleteProfileModal}
          customWidth="20%"
          handleClose={() => {}}
        />
        <Stack>
          <Stack
            style={{
              height: "160px",
              width: "100%",
              backgroundColor: "#B58B5D",
            }}
          >
            <Typography
              className="fs24px bold white_color p_t25px"
              sx={{ p: 5 }}
            >
              Welcome {firstName},
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            flexGrow={1}
            p={5}
            gap={4}
            marginTop="-90px"
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ width: { lg: "25%", md: "35%", sm: "40%" } }}
              gap={3}
            >
              {deviceData?.map((ele) => (
                <DashboardCard
                  key={ele.id}
                  title={ele.title}
                  total={dashboardData[ele.total]}
                  img={ele.img}
                />
              ))}
            </Stack>
            <Paper
              sx={{
                width: { lg: "75%", md: "65%", sm: "60%" },
                height: { lg: "75vh", md: "75vh", sm: "55vh" },
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!dashboardData?.geolocationLat ? (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    sx={{
                      width: 250,
                      height: 250,
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    alt="livestock img"
                    src={DashboardNoData}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Stack
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        border: `2px solid ${theme.palette.primary.main}`,
                        cursor: "pointer",
                        width: 220,
                        height: 230,
                        p: 2,
                        borderRadius: theme.spacing(1),
                      }}
                      onClick={() => {
                        navigate("/collars");
                        handleCollarModalOpen("add");
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon
                        sx={{
                          fontSize: 100,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <TypographyPrimary
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: theme.spacing(4),
                        }}
                      >
                        Add Collar
                      </TypographyPrimary>
                    </Stack>
                  </Box>
                </Box>
              ) : (
                <GetMap
                  mapWidth="100%"
                  mapHeight="100%"
                  isLivestocks={true}
                  livestockData={getLivestockStatus}
                  geofenceCoordinates={{
                    lat: dashboardData?.geolocationLat,
                    lng: dashboardData?.geolocationLng,
                    radius: dashboardData?.geolocationRadius,
                  }}
                />
              )}
            </Paper>
          </Stack>
        </Stack>
      </AdminUIContainer>
    </>
  );
};

export default AdminDashBoard;
