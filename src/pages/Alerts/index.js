import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  BackdropLoader,
  TableV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
  TabPaneV2,
} from "../../ComponentsV2";
import { Container, IconButton, Stack } from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useAlertsContext from "../../hooks/useAlertContext";
import { tableHeadData, BreadcrumbData } from "./Data";

const AlertsPage = () => {
  const {
    openBackdropLoader,
    selectedDate,
    setSelectedDate,
    handleAlertDelete,
    showConfirmModal,
    handleConfirmWindowClose,
    handleAlertDeleteConfirm,
    snackbarAlert,
    onSnackbarAlertClose,
    AllAlertData,
    pageCount,
    paginationPageNo,
    setPaginationPageNo,
    alertsDataLength,
    alertDeletedId,
    handleAllAlertDeleteConfirm,
    openSnackbarAlert,
  } = useAlertsContext();

  const getTableFormattedData = (data) => {
    const res = data
      ?.map((ele) => ({
        ...ele,
        action: [
          <IconButton aria-label="delete">
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              onClick={() => handleAlertDelete(ele.id)}
            />
          </IconButton>,
        ],
      }))
      .map((ele) => {
        delete ele.id;
        return ele;
      });
    return res;
  };

  const handleSnackBarAlert = () => {
    if (!alertsDataLength) {
      openSnackbarAlert("error", "Nothing to Export");
    }
  };

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={
        alertDeletedId !== null
          ? handleAlertDeleteConfirm
          : handleAllAlertDeleteConfirm
      }
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8, pb: 5 }}>
        <BackdropLoader open={openBackdropLoader} />
        <TypographyPrimary sx={{ fontSize: "2rem" }}>Alerts</TypographyPrimary>
        <Stack sx={{ width: "100%", pb: 3 }}>
          <Stack pb={2}>
            <TabPaneV2
              paneText={`showing ${
                alertsDataLength > 10 ? 10 : alertsDataLength
              } out of ${alertsDataLength}`}
              paneTextColor="#000"
              datePicker={true}
              clearBtn={true}
              onClearAll={() => handleAlertDelete(null)}
              btnText={
                alertsDataLength ? (
                  <ExportAsCSV
                    headers={tableHeadData}
                    data={AllAlertData}
                    fileName="alerts"
                  >
                    Export
                  </ExportAsCSV>
                ) : (
                  "Export"
                )
              }
              onBtnClick={handleSnackBarAlert}
              btnColor="#fff"
              btnBg="#B58B5D"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Stack>
          <TableV2
            tableHeadData={tableHeadData}
            tableRowData={getTableFormattedData(AllAlertData)}
          />
        </Stack>
        {AllAlertData?.length ? (
          alertsDataLength > 10 && (
            <Stack direction="row" justifyContent="center">
              <CustomPagination
                size="large"
                page={paginationPageNo}
                count={pageCount}
                onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
              />
            </Stack>
          )
        ) : (
          <NoData />
        )}
      </Container>
    </AdminUIContainer>
  );
};

export default AlertsPage;
