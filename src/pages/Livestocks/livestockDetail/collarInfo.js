import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "../../Collars/viewCollarDetails/showLivestocks";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { deviceInfoData, pedometerInfoData} from "../Data";
import useErrorMessage from "../../../hooks/useErrorMessage";
import DeviceCard from "../components/DeviceCard";

const CollarInfo = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [allUnassignCollars, setAllUnassignCollars] = useState([]);
  const { openSnackbarAlert } = useLivestockContext();
  const { getErrorMessage } = useErrorMessage();

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

  const getUnassignCollars = async () => {
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?page=1&limit=25`,
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
        setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      openSnackbarAlert("error", getErrorMessage(err));
    }
    setShowModal(false);
  };

  return (
    <>
      {data?.collarUid ? (
        <Stack direction={"row"} gap={4}>
          <DeviceCard
            label="collar"
            data={data}
            deviceDataFormat={deviceInfoData}
            onRemove={handelCollarRemove}
          />
          <DeviceCard
            label="pedometer"
            data={data}
            deviceDataFormat={pedometerInfoData}
            onRemove={() => {}}
          />
        </Stack>
      ) : (
        <Stack direction={'row'} my={4} gap={4}>
          <AddBtn
            text1="collar"
            text2="livestock"
            onClick={() => setShowModal(true)}
          />
           <AddBtn
            text1="Pedometer"
            text2="livestock"
            onClick={() => setShowModal(true)}
          />
        </Stack>
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignCollars}
            onSubmit={(selectedValue) => handleCollarAssign(selectedValue)}
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
