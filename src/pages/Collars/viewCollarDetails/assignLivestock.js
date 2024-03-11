import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal, Skeleton, Spinner } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import { useEffect, useState } from "react";
import useCollarContext from "../../../hooks/useCollarContext";
import useErrorMessage from "../../../hooks/useErrorMessage";
import useAssignLivestock from "../../../hooks/services/useAssignLivetock";
import useRemoveLivestock from "../../../hooks/services/useRemoveLivestock";
import useGetUnassignLivestock from "../../../hooks/services/useGetUnassignLivestocks";

const AssignLivestock = ({ data, deviceLoading, setLoading }) => {
  const [fetchUnassignLivestocks, setFetchUnassignLivestock] = useState(false);

  const { getErrorMessage } = useErrorMessage();
  const [allUnassignLivestocks, setAllUnassignLivestocks] = useState({
    livestockData: [],
    dataLength: 0,
  });
  const [unassignLivestockPagination, setUnassignLivestockPagination] =
    useState(1);
  const [getUnassignLivestockLoading, setGetUnassignLivestockLoading] =
    useState(false);
  const [livestockAssignLoading, setLivestockAssignLoading] = useState(false);
  const [isInputChange, setIsInputChange] = useState(false);
  const [query, setQuery] = useState("");
  const {
    openAddLiveStockModal,
    setOpenAddLivestockModal,
    setOpenBackdropLoader,
  } = useLivestockContext();
  const {
    openSnackbarAlert,
    getAllDevices,
    openBackdropLoader: firstLoadingLoader,
  } = useCollarContext();

  // useEffect(() => {
  //   if (query || isInputChange) {
  //     const timeout = setTimeout(() => getUnassignLivestock(query), 1000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [query]);

  const { isLoading, error, allUnassignLivestock, refetch, isSuccess } =
    useGetUnassignLivestock();
  const { isAssigning, assignLivestock } = useAssignLivestock("collar");
  const { isRemoving, removeLivestock } = useRemoveLivestock("collar");



  const handleFetchUnassignLivestock = () => {
    // refetch();
    // console.log(isSuccess, "vfjbvfjnvjnfvjnfjnvjfnvjf")
    // if (!isLoading && !error && data && isSuccess) {
    setOpenAddLivestockModal(true);
    // }
  };

  const handleAssignLivestock = (selectedValue) => {
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };

    assignLivestock(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          setOpenAddLivestockModal(false);
        }
      },
    });
  };

  const handleRemoveLivestock = (collarId, livestockId) => {
    const body = {
      liveStockID: livestockId,
      deviceID: collarId,
    };

    removeLivestock(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
        }
      },
    });
  };

  return (
    <Box py={4}>
      {!deviceLoading ? (
        data?.Uid ? (
          <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
            <LivestockInfo
              data={data}
              btnText="remove"
              btnBgColor="#FF0505"
              loading={isRemoving}
              btnIcon={
                null ? (
                  <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                ) : null
              }
              onBtnClick={handleRemoveLivestock}
            />
          </Stack>
        ) : (
          <Stack direction={"row"}>
            <AddBtn
              text1="livestock"
              text2="collar"
              loading={isLoading}
              onClick={handleFetchUnassignLivestock}
            />
          </Stack>
        )
      ) : (
        <Skeleton width="43vw" height="60vh" sx={{ background: "#F7F8FD" }} />
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestock?.liveStockData}
            dataLength={allUnassignLivestock?.dataLength}
            pagination={unassignLivestockPagination}
            setPagination={(page) => {
              setUnassignLivestockPagination(page);
            }}
            onSubmit={handleAssignLivestock}
            setOpenAddLivestockModal={setOpenAddLivestockModal}
            loading={isAssigning}
            openSnackbarAlert={() =>
              openSnackbarAlert("error", "Please choose a livestock to assign")
            }
            onSearch={(term) => {
              setQuery(term);
            }}
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
