import {useState, useEffect} from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { GetMap, DashboardCard, AddBtn, CustomModal } from "../../ComponentsV2";
import { AddCircleOutlineOutlinedIcon } from "../../icons";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../ComponentsV2/themeComponents";
import ModalContent from "./ModalContent"
import {
  ClientImg,
  GatewayImg,
  DeviceImg,
  BMImg,
  DashboardNoData,
} from "../../assets";
import { useTheme } from "@emotion/react";
import useCollarContext from "../../hooks/useCollarContext";
import { useNavigate } from "react-router-dom";
import { request } from "../../apis/axios-utils";

const AdminDashBoard = () => {
  const deviceData = [
    {
      id: 1,
      title: "total collars",
      total: 0,
      img: ClientImg,
    },
    {
      id: 2,
      title: "total livestocks",
      total: 0,
      img: GatewayImg,
    },
    {
      id: 3,
      title: "safe livestocks",
      total: 0,
      img: BMImg,
    },
    {
      id: 4,
      title: "unsafe livestocks",
      total: 0,
      img: DeviceImg,
    },
    {
      id: 5,
      title: "alerts",
      total: 0,
    img: DeviceImg,
    },
  ];
  const theme = useTheme();
  
  const handleCompleteProfileModal = localStorage.getItem("showProfileCompleteModal") === "true";
  const {handleCollarModalOpen} = useCollarContext()

  const setHandleCompleteProfileModal = () => {
    localStorage.removeItem("showProfileCompleteModal") 
  }
  const navigate = useNavigate();

  const userName = JSON.parse(localStorage.getItem("userData"))?.userName?.split(" ")[0];
  const firstName = userName?.charAt(0)?.toUpperCase() + userName?.slice(1);

  // useEffect(() => {
  //   request({
  //     url:"/thresholds/SetThreshold?livestockID=653f4e2c7c4dd73e36bd3351",
  //     // url: `/liveStock/getUsersLiveStockAllAlerts?startDate=2023-11-01&page=${paginationPageNo}&limit=${pageLimit}&endDate=2023-11-02`,
  //   })
  //     .then((res) => {
  //       if (res?.status === 200) {
  //         // const data = res?.data?.data?.AllAlertData || [];
  //         // const formattedData = data?.map((alert) => ({
  //         //   alertName: alert?.message,
  //         //   collarUid: alert?.assignedDevice?.uID,
  //         //   livestockName: alert?.liveStockName,
  //         //   thresholdValue: alert?.thresholdValue,
  //         //   alarmValue: alert?.alertValue,
  //         //   time: formattedDate(alert?.createdAt, "time"),
  //         //   date: formattedDate(alert?.createdAt, "date"),
  //         // }));
  //         // setAllAlertData(formattedData);
  //       } else {
  //         throw new Error("something went wrong");
  //       }
  //       // const formattedData =
  //       // setCollars(formattedData);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []);
  
  return (
    <>
      <AdminUIContainer>
        <CustomModal 
           content={<ModalContent setHandleModal={setHandleCompleteProfileModal}/>}
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
                  total={ele.total}
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
            {/* when no data is available */}
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
                      handleCollarModalOpen("add")
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

              {/* <GetMap mapWidth="100%" mapHeight="100%" isLivestocks={true} /> */}
            </Paper>
          </Stack>
        </Stack>
      </AdminUIContainer>
    </>
  );
};

export default AdminDashBoard;
