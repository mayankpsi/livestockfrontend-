import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  Breadcrumb,
  BackdropLoader,
  TableV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
  TabPaneV2,
} from "../../ComponentsV2";
import { Container, Stack } from "@mui/material";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useAlertsContext from "../../hooks/useAlertContext";

const tableHeadData = [
  "alert name",
  "collar Uid",
  "Livestock name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "action",
];

const BreadcrumbData = [
  {
    label: "Alerts",
    link: "alerts",
  },
];

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
    setPaginationPageNo,
  } = useAlertsContext();

  const getTableFormattedData = (data) => {
    const res = data
      ?.map((ele) => ({
        ...ele,
        action: [
          <DeleteOutlineOutlinedIcon
            fontSize="large"
            onClick={() => handleAlertDelete(ele.id)}
          />,
        ],
      }))
      .map((ele) => {
        delete ele.id;
        return ele;
      });
    return res;
  };

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={handleAlertDeleteConfirm}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
    >
      <Container maxWidth="xl" sx={{ marginTop: 8 }}>
        <BackdropLoader open={openBackdropLoader} />
        <Breadcrumb data={BreadcrumbData} />
        <TypographyPrimary>Alerts</TypographyPrimary>
        <Stack sx={{ width: "100%", py: 3 }}>

          <Stack py={2}>
          <TabPaneV2
            paneText="showing 10 out of 20 Alerts"
            paneTextColor="#000"
            btnText={
              <ExportAsCSV
                headers={tableHeadData}
                data={AllAlertData}
                fileName="alerts">
                Export
              </ExportAsCSV>
            }
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
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              count={pageCount}
              onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
            />
          </Stack>
        ) : (
          <NoData />
        )}
      </Container>
    </AdminUIContainer>
  );
};

export default AlertsPage;
