import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { AddBtn, CustomModal, Skeleton } from "../../../ComponentsV2";
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
  const [allUnassignCollars, setAllUnassignCollars] = useState({
    collarData: [],
    dataLength: 0,
  });
  const [unassignDevicePagination, setUnassignDevicePagination] = useState(1);
  const [choseDevice, setChoseDevice] = useState("");
  const [isInputChange, setIsInputChange] = useState(false);
  const [query, setQuery] = useState("");
  const { openSnackbarAlert, getAllLivestock, openBackdropLoader } =
    useLivestockContext();
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

  useEffect(() => {
    if (query || isInputChange) {
      const timeout = setTimeout(
        () => getUnassignCollars(choseDevice, query, unassignDevicePagination),
        1000
      );
      return () => clearTimeout(timeout);
    }
  }, [query]);

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

  const getUnassignCollars = async (type, searchTerm = "", page = 1) => {
    loadingOn(type);
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?deviceType=${type}&page=${page}&limit=${9}&searchTerm=${searchTerm}`,
      });
      if (res.status === 200) {
        const { UserFreeDeviceInfo, dataLength } = res?.data?.data;
        setAllUnassignCollars({
          collarData: UserFreeDeviceInfo,
          dataLength: dataLength,
        });
        setShowModal(true);
      } else {
        setAllUnassignCollars({
          collarData: [],
          dataLength: 0,
        });
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
    loadingOn(choseDevice);
    const body = {
      liveStockID: data?.id,
      deviceID: selectedValue,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=${choseDevice}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        const msg = `${
          choseDevice?.charAt(0).toUpperCase() +
          choseDevice.slice(1).toLowerCase()
        } successfully Added :)`;
        openSnackbarAlert("success", msg);
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      loadingOff(choseDevice);
    }
  };

  const getData = (data) => {
    return {
      status: data?.deviceActiveStatus,
      uid: data?.uID,
      name: data?.deviceName,
      macId: data?.macID,
      addedOn: data?.createdAt,
      battery: data?.batteryPercent,
    };
  };

  return (
    <>
      <Stack direction={"row"} gap={4} py={4}>
        {openBackdropLoader ? (
          <Skeleton width="50%" height={420} />
        ) : data?.collar?.uID ? (
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
            loading={!showModal && collarLoading}
            onClick={() => {
              setChoseDevice("collar");
              getUnassignCollars("collar");
            }}
          />
        )}
        {openBackdropLoader ? (
          <Skeleton width="50%" height={420} />
        ) : data?.pedometer?.uID ? (
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
            loading={!showModal && pedometerLoading}
            onClick={() => {
              setChoseDevice("pedometer");
              getUnassignCollars("pedometer");
            }}
          />
        )}
      </Stack>
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignCollars?.collarData}
            dataLength={allUnassignCollars?.dataLength}
            pagination={unassignDevicePagination}
            setPagination={(page) => {
              setUnassignDevicePagination(page);
              getUnassignCollars(choseDevice, query, page);
            }}
            onSubmit={handleCollarAssign}
            setOpenAddLivestockModal={() => setShowModal(false)}
            loading={
              choseDevice === "collar" ? collarLoading : pedometerLoading
            }
            openSnackbarAlert={() =>
              openSnackbarAlert(
                "error",
                `Please choose a ${choseDevice} to assign`
              )
            }
            onSearch={(term) => {
              setQuery(term);
              setIsInputChange(true);
            }}
          />
        }
        openModal={showModal}
        handleClose={() => {
          setShowModal(false);
          setUnassignDevicePagination(1);
        }}
      />
    </>
  );
};

export default CollarInfo;
