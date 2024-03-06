import { Box, Button, Stack, Typography } from "@mui/material";
import { breedingAICardData, breedingAITableData } from "./Data";
import {
  CustomLabel,
  CustomModal,
  CustomPagination,
  NoData,
  ParameterCard,
  Skeleton,
  Spinner,
  TabPane,
  TableSkeleton,
  TableV2,
} from "../../../../ComponentsV2";
import AddAiAttempt from "./AddAiAttempt";
import { useState } from "react";
import useGetAIAttempts from "./hooks/useGetAIAttempts";
import { useParams } from "react-router-dom";
import { getTabText } from "../../../../Role/Admin/UserManagemnet/utils/utils";

const getLabel = (label) => {
  if (label?.toLowerCase() === "pending")
    return { text: "Pending", type: "warning" };
  if (label?.toLowerCase() === "pass")
    return { text: "Passed", type: "success" };
  if (label?.toLowerCase() === "fail") return { text: "Failed", type: "error" };
};

const getFormattedData = (data, handleShowModal) => {
  return data?.result?.map((ele) => ({
    aiAttemptNo: ele?.aiAttemptNo,
    sireNo: ele?.sireNo,
    attemptDate: ele?.attemptDate,
    result: (
      <CustomLabel
        text={getLabel(ele?.result)?.text}
        type={getLabel(ele?.result)?.type}
        width={125}
        sx={{ marginLeft: "auto" }}
      />
    ),
    action: [
      getLabel(ele?.result)?.type === "warning" ? (
        <Button
          variant="contained"
          sx={{ fontSize: "16px", minWidth: "130px" }}
          onClick={() => handleShowModal("update", ele)}
        >
          update
        </Button>
      ) : (
        <Button
          variant="contained"
          sx={{
            fontSize: "16px",
            minWidth: "130px",
            background: "#ECDEC6",
            color: "#B58B5D",
            fontWeight: "bold",
          }}
          onClick={() => handleShowModal("view", ele)}
        >
          View
        </Button>
      ),
    ],
  }));
};

const BreedingAI = () => {
  const { id } = useParams();
  const [addNewAttemptModal, setAddNewAiAttempt] = useState(false);
  const [pagination, setPagination] = useState(1)
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [contentType, setContentType] = useState(null);

  const { isLoading, error, data } = useGetAIAttempts(id,pagination);

  const handleModalClose = () => {
    setAddNewAiAttempt(false);
  };

  const handleShowModal = (type, attempt) => {
    setAddNewAiAttempt(true);
    setContentType(type);
    if (type !== "add") setSelectedAttempt(attempt);
  };

  const getModalContent = (type) => {
    const cases = {
      add: <AddAiAttempt onClose={handleModalClose} type="add" />,
      update: (
        <AddAiAttempt
          onClose={handleModalClose}
          type="update"
          selectedAttempt={selectedAttempt}
        />
      ),
      view: (
        <AddAiAttempt
          onClose={handleModalClose}
          type="view"
          selectedAttempt={selectedAttempt}
        />
      ),
    };

    return cases[type];
  };
  return (
    <Stack width="100%">
      <Stack direction={"row"} gap={2} flexWrap={"wrap"} sx={{ py: 2 }}>
        {isLoading ? (
          <>
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
            <Skeleton width={"24%"} height={"10vh"} />
          </>
        ) : (
          breedingAICardData?.map((ele) => (
            <ParameterCard
              label={ele.label}
              value={data?.overviewData[ele.key]}
              icon={ele.icon}
              colors={ele.colors}
              suffix={""}
            />
          ))
        )}
      </Stack>
      <TabPane
        text={getTabText("AI Attempts", data?.aiData?.dataLength)}
        btnText="Add New Attempt"
        hover={true}
        btnIcon={true}
        onBtnClick={() => handleShowModal("add")}
      />
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(4).fill("20%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <Box mt={2}>
          <TableV2
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={breedingAITableData}
            tableRowData={getFormattedData(data?.aiData, handleShowModal)}
          />
        </Box>
      )}
      {data?.aiData?.dataLength ? (
        data?.aiData?.dataLength > 10 ? (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={pagination}
              count={Math.ceil(data?.aiData?.dataLength / 10)}
              onPageChange={(pageNo) => setPagination(pageNo)}
            />
          </Stack>
        ) : null
      ) : (
        !isLoading && <NoData/>
      )}
      <CustomModal
        content={getModalContent(contentType)}
        openModal={addNewAttemptModal}
        handleClose={() => {}}
      />
    </Stack>
  );
};

export default BreedingAI;
