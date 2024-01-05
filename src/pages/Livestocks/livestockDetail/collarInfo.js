import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "../../Collars/viewCollarDetails/showLivestocks";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { deviceInfoData, pedometerInfoData } from "../Data";
import useErrorMessage from "../../../hooks/useErrorMessage";
import DeviceCard from "../components/DeviceCard";

const CollarInfo = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [allUnassignCollars, setAllUnassignCollars] = useState([]);
  const { openSnackbarAlert } = useLivestockContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    if (!data?.collarUid) {
    }
  }, [data]);

  const handelCollarRemove = async (type) => {
    const body = {
      liveStockID: data?.id,
      deviceID: data?.collar?._id,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=${type}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        openSnackbarAlert("success", "Livestock successfully removed :)");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    }
  };

  const getUnassignCollars = async (type) => {
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?page=1&limit=25&deviceType=${type}`,
      });
      if (res.status === 200) {
        setAllUnassignCollars(res?.data?.data?.UserFreeDeviceInfo);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCollarAssign = async (selectedValue, type) => {
    const body = {
      liveStockID: data?.id,
      deviceID: selectedValue,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=${type}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        openSnackbarAlert("success", "Collar successfully Added :)");
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    }
    setShowModal(false);
  };

  const getData = (data) => {
    return {
      status: data?.deviceActiveStatus,
      uid: data?.uID,
      name: data?.deviceName,
      macId: data?.macID,
      addedOn: data?.createdAt,
      battery: data?.collarBattery,
    };
  };

  return (
    <>
      <Stack direction={"row"} gap={4} py={4}>
        {data?.collar?.uID ? (
          <DeviceCard
            label="collar"
            data={getData(data?.collar)}
            deviceDataFormat={deviceInfoData}
            onRemove={() => handelCollarRemove("collar")}
          />
        ) : (
          <AddBtn
            text1="collar"
            text2="livestock"
            onClick={() => {
              getUnassignCollars("collar");
              setShowModal(true);
            }}
          />
        )}
        {data?.pedometer?.uID ? (
          <DeviceCard
            label="pedometer"
            data={getData(data?.pedometer)}
            deviceDataFormat={deviceInfoData}
            onRemove={() => handelCollarRemove("pedometer")}
          />
        ) : (
          <AddBtn
            text1="Pedometer"
            text2="livestock"
            onClick={() => {
              getUnassignCollars("pedometer");
              setShowModal(true);
            }}
          />
        )}
      </Stack>
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignCollars}
            onSubmit={handleCollarAssign}
            setOpenAddLivestockModal={() => setShowModal(false)}
            openSnackbarAlert={() =>
              openSnackbarAlert("error", "Please choose a collar to assign")
            }
          />
        }
        openModal={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
};

export default CollarInfo;
