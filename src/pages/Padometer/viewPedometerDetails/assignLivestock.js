import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import useCollarContext from "../../../hooks/useCollarContext";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { useParams } from "react-router-dom";

const AssignLivestock = ({ data, setLoading, loading }) => {
  const { getErrorMessage } = useErrorMessage();
  const [allUnassignLivestocks, setAllUnassignLivestocks] = useState([]);
  const {
    openAddLiveStockModal,
    setOpenAddLivestockModal,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { openSnackbarAlert } = useCollarContext();
  const { id } = useParams();

  const getDeviceData = () => {
    request({ url: `/devices/getDeviceByID?deviceID=${id}` });
  };

  const handelLivestockRemove = async (collarId, livestockId) => {
    setLoading(true);
    setOpenBackdropLoader(true);
    const body = {
      liveStockID: livestockId,
      deviceID: collarId,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=pedometer`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully removed :)");
        getDeviceData();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  const getUnassignLivestock = async () => {
    setOpenBackdropLoader(true);
    setLoading(true);
    try {
      const res = await request({
        url: `/liveStock/getAll?status=false&deviceType=pedometer`,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        setAllUnassignLivestocks(res?.data?.data?.liveStockData);
        setOpenAddLivestockModal(true);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handelLivestockAssign = async (selectedValue) => {
    setLoading(true);
    setOpenAddLivestockModal(false);
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=pedometer`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully Added :)");
        getDeviceData();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      setOpenBackdropLoader(false);
      openSnackbarAlert("error", getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box py={4}>
      {data?.Uid ? (
        <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
          <LivestockInfo
            data={data}
            loading={loading}
            btnText="remove"
            btnBgColor="#FF0505"
            onBtnClick={handelLivestockRemove}
          />
        </Stack>
      ) : (
        <AddBtn
          text1="livestock"
          text2="collar"
          loading={loading}
          onClick={() => getUnassignLivestock()}
        />
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestocks}
            onSubmit={(selectedValue) => handelLivestockAssign(selectedValue)}
            setOpenAddLivestockModal={setOpenAddLivestockModal}
            openSnackbarAlert={() =>
              openSnackbarAlert("error", "Please choose a livestock to assign")
            }
            isLivestock={true}
          />
        }
        openModal={openAddLiveStockModal}
        handleClose={() => setOpenAddLivestockModal(false)}
      />
    </Box>
  );
};

export default AssignLivestock;
