import React, { useState, useEffect } from "react";
import { Stack, Box, Divider } from "@mui/material";
import {
  TabPane,
  StatusCard,
  AddBtn,
  CustomModal,
} from "../../../ComponentsV2";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import NetworkCellOutlinedIcon from "@mui/icons-material/NetworkCellOutlined";
import Battery5BarOutlinedIcon from "@mui/icons-material/Battery5BarOutlined";
import ShowLivestocks from "../../Collars/viewCollarDetails/showLivestocks";
import { useTheme } from "@emotion/react";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";

const deviceInfoData = [
  {
    label: "Collar UID",
    value: "collar_1",
  },
  {
    label: "Collar Name",
    value: "device name",
  },
  {
    label: "Collar MAC ID",
    value: "#3537HDB83728",
  },
  {
    label: "Collar Added on",
    value: "24/02/23, 04:23 PM",
  },
];

const statusCardData = [
  {
    text: "network strength",
    status: "good",
    icon: (
      <NetworkCellOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#347D00",
  },
  {
    text: "battery",
    status: "56%",
    icon: (
      <Battery5BarOutlinedIcon
        fontSize="large"
        sx={{ mr: 1, color: "#347D00" }}
      />
    ),
    statusColor: "#F19B4F",
  },
];

const data = [];

const CollarInfo = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [allUnassignCollars, setAllUnassignCollars] = useState([]);
  const theme = useTheme();
  const { getCamelCase } = useGetCamelCase();
  const {openSnackbarAlert} = useLivestockContext();

  useEffect(() => {
    if (!data?.collarUid) {
      getUnassignCollars();
    }
  }, [data]);

  const handelCollarRemove = async () => {
    const body = {
      liveStockID: data?.id,
      deviceID: data?.collarId,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock`,
        method: "POST",
        data:body
      });
      if (res.status === 200) {
        openSnackbarAlert("success","Livestock successfully removed :)");
        setTimeout(()=> window.location.reload(),1500);
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      openSnackbarAlert("error",err?.message?err.message:"Something went wrong :(")
    }
  };


  const getUnassignCollars = async () => {
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?page=1&limit=25`,
      });
      if (res.status === 200) {
        setAllUnassignCollars(res?.data?.data?.UserFreeDeviceInfo);
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCollarAssign = async (selectedValue) => {
    const body = {
      liveStockID: data?.id,
      deviceID: selectedValue,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        openSnackbarAlert("success", "Collar successfully Added :)");
        setTimeout(() => window.location.reload(), 1500);
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      openSnackbarAlert(
        "error",
        err?.message ? err.message : "Something went wrong :("
      );
    }
    setShowModal(false);
  };

  return (
    <>
      {data?.collarUid ? (
        <Stack
          my={4}
          direction="row"
          width="100%"
          alignItems="flex-start"
          gap={4}
        >
          <Stack
            width="55%"
            sx={{ border: "1px solid #dddddd", borderRadius: "10px" }}
          >
            <Box p="10px 20px">
              <TabPane
                text="Device Info"
                btnText="remove"
                btnIcon={false}
                btnBgColor="#FF0505"
                onBtnClick={handelCollarRemove}
              />
            </Box>
            <Divider />
            <Stack px="20px">
              <Box display="flex" justifyContent="flex-start">
                <TypographyPrimary
                  sx={{
                    color: "#B5B5C3",
                    minWidth: "30%",
                    display: "flex",
                    justifyContent: "space-between",
                    pr: 5,
                  }}
                >
                  Status
                  <Box component="span">:</Box>
                </TypographyPrimary>
                <TypographyPrimary
                  sx={{
                    color: data?.collarWifiStatus
                      ? theme.palette.success.light
                      : theme.palette.error.light,
                  }}
                >
                  {data?.collarWifiStatus ? "Online" : "Offline"}
                </TypographyPrimary>
              </Box>
              {deviceInfoData
                ?.map((ele) => ({
                  ...ele,
                  value: data ? data[getCamelCase(ele.label)] : "",
                }))
                ?.map((ele) => (
                  <Box display="flex" justifyContent="flex-start">
                    <TypographyPrimary
                      sx={{
                        color: "#B5B5C3",
                        minWidth: "30%",
                        display: "flex",
                        justifyContent: "space-between",
                        pr: 5,
                      }}
                    >
                      {ele.label}
                      <Box component="span">:</Box>
                    </TypographyPrimary>
                    <TypographyPrimary sx={{ color: "#222222" }}>
                      {ele.value}
                    </TypographyPrimary>
                  </Box>
                ))}
            </Stack>
          </Stack>
          <Stack
            className="radius-10"
            sx={{ p: 2, border: "1px solid #dddddd" }}
            flexGrow={0}
            width="45%"
          >
            <TypographyPrimary>Collar status</TypographyPrimary>
            <Stack direction="column" gap={1}>
              {statusCardData
                ?.map((ele) => ({
                  ...ele,
                  status: data
                    ? `${data[getCamelCase(ele?.text)]}${
                        ele?.text?.toLowerCase()?.includes("battery") ? "%" : ""
                      }`
                    : "",
                }))
                ?.map((card) => (
                  <StatusCard
                    key={card.text}
                    text={card.text}
                    status={card.status}
                    icon={card.icon}
                    statusColor={card.statusColor}
                  />
                ))}
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Stack my={4}>
          <AddBtn onClick={() => setShowModal(true)} />
        </Stack>
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignCollars}
            onSubmit={(selectedValue) => handleCollarAssign(selectedValue)}
          />
        }
        openModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CollarInfo;