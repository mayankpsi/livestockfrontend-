import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "../../Collars/viewCollarDetails/showLivestocks";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { deviceInfoData, pedometerInfoData } from "../Data";
import useErrorMessage from "../../../hooks/useErrorMessage";
import DeviceCard from "../components/DeviceCard";

const CollarInfo = ({
  data,
  collarLoading,
  setCollarLoading,
  pedometerLoading,
  setPedometerLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [allUnassignCollars, setAllUnassignCollars] = useState([]);
  const { openSnackbarAlert, getAllLivestock } = useLivestockContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    if (!data?.collarUid) {
    }
  }, [data]);

  const loadingOn = (type) =>
    type?.toLowerCase() === "collar"
      ? setCollarLoading(true)
      : setPedometerLoading(true);
  const loadingOff = (type) =>
    type?.toLowerCase() === "collar"
      ? setCollarLoading(false)
      : setPedometerLoading(false);

  const handelCollarRemove = async (type) => {
    loadingOn(type);
    const body = {
      liveStockID: data?.id,
      deviceID: data?.[`${type}`]?._id,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=${type}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        const msg = `${
          type?.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
        } successfully Removed :)`;
        openSnackbarAlert("success", msg);
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      loadingOff(type);
    }
  };

  const getUnassignCollars = async (type) => {
    loadingOn(type);
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?page=1&limit=25&deviceType=${type}`,
      });
      if (res.status === 200) {
        setAllUnassignCollars(res?.data?.data?.UserFreeDeviceInfo);
        setShowModal(true);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      loadingOff(type);
    }
  };

  const handleCollarAssign = async (selectedValue, type) => {
    setShowModal(false);
    loadingOn(type);
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
        const msg = `${
          type?.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
        } successfully Added :)`;
        openSnackbarAlert("success", msg);
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      loadingOff(type);
    }
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
            loading={collarLoading}
            deviceDataFormat={deviceInfoData}
            onRemove={() => handelCollarRemove("collar")}
          />
        ) : (
          <AddBtn
            text1="collar"
            text2="livestock"
            loading={collarLoading}
            onClick={() => {
              getUnassignCollars("collar");
            }}
          />
        )}
        {data?.pedometer?.uID ? (
          <DeviceCard
            label="pedometer"
            data={getData(data?.pedometer)}
            deviceDataFormat={deviceInfoData}
            loading={pedometerLoading}
            onRemove={() => handelCollarRemove("pedometer")}
          />
        ) : (
          <AddBtn
            text1="Pedometer"
            text2="livestock"
            loading={pedometerLoading}
            onClick={() => {
              getUnassignCollars("pedometer");
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
              openSnackbarAlert("error", `Please choose a device to assign`)
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
