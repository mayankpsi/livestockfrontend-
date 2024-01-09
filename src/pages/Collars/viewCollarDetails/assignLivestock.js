import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal, Spinner } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import { useState } from "react";
import useCollarContext from "../../../hooks/useCollarContext";
import useErrorMessage from "../../../hooks/useErrorMessage";

const AssignLivestock = ({ data, loading, setLoading }) => {
  const { getErrorMessage } = useErrorMessage();
  const [allUnassignLivestocks, setAllUnassignLivestocks] = useState([]);
  const {
    openAddLiveStockModal,
    setOpenAddLivestockModal,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const { openSnackbarAlert } = useCollarContext();

  const handelLivestockRemove = async (collarId, livestockId) => {
    setLoading(true);
    setOpenBackdropLoader(true);
    const body = {
      liveStockID: livestockId,
      deviceID: collarId,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=collar`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully removed :)");
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
        url: `/liveStock/getAll?status=false&deviceType=collar`,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        setOpenAddLivestockModal(true);
        setAllUnassignLivestocks(res.data.data.liveStockData);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      openSnackbarAlert("error", error.message);
    } finally {
      setOpenBackdropLoader(false);
      setLoading(false);
    }
  };

  const handelLivestockAssign = async (selectedValue) => {
    setOpenAddLivestockModal(false);
    setOpenBackdropLoader(true);
    setLoading(true);
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=collar`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        setOpenBackdropLoader(false);
        openSnackbarAlert("success", "Livestock successfully Added :)");
        // setTimeout(() => window.location.reload(), 500);
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
            btnText="remove"
            btnBgColor="#FF0505"
            loading={loading}
            btnIcon={
              loading ? (
                <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
              ) : null
            }
            onBtnClick={handelLivestockRemove}
          />
        </Stack>
      ) : (
        <Stack direction={"row"} gap={4} py={4}>
          <AddBtn
            text1="livestock"
            text2="collar"
            loading={loading}
            onClick={() => getUnassignLivestock()}
          />
        </Stack>
      )}

      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestocks}
            onSubmit={handelLivestockAssign}
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
