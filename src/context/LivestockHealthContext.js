import { useState, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import useDateFormat from "../hooks/useDateFormat";
import { request } from "../apis/axios-utils";
import { useReducer } from "react";
import useLivestockContext from "../hooks/useLivestockContext";

const LivestockHealthContext = createContext();

const chartDateRangeInitialStep = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
];

const actions = {
  GET_LOGS_DATA: "GET_LOGS_DATA",
  HANDLE_PAGINATION: "HANDLE_PAGINATION",
  LOADING: "LOADING",
};

const initialState = {
  logsData: [],
  logsDataLength: 0,
  pagination: 1,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions?.GET_LOGS_DATA:
      return {
        ...state,
        logsData: action.payload.data,
        logsDataLength: action.payload.dataLength,
      };
    case actions?.HANDLE_PAGINATION:
      return {
        ...state,
        pagination: action.payload,
      };
    case actions?.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};

export const LivestockHealthContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(1);
  const { formattedDate, paginationDateFormat } = useDateFormat();
  const [healthChartData, setHealthChartData] = useState([]);
  const [chartDataLoader, setChartDataLoader] = useState(false);
  const [healthLogData, dispatch] = useReducer(reducer, initialState);
  const [healthCardData, setHealthCardData] = useState({
    cardData: {},
    threshold: {},
  });
  const [singleSelectedDate, setSingleSelectedDate] = useState(new Date());
  const [logsDateRange, setLogsDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [chartDateRange, setChartDateRange] = useState(
    chartDateRangeInitialStep
  );
  const { openSnackbarAlert } = useLivestockContext();

  useEffect(() => {
    setChartDateRange(chartDateRangeInitialStep);
    setSingleSelectedDate(new Date());
  }, [activeTab]);

  const getErrorMessage = (res) => {
    return (
      res?.response?.data?.message ||
      res?.message ||
      "Server error, try again later"
    );
  };

  const logsUrl = (id, activeTab) => {
    const start = paginationDateFormat(logsDateRange?.[0]?.startDate, "date");
    const end = paginationDateFormat(logsDateRange?.[0]?.endDate, "date");
    const page = healthLogData?.pagination;
    const urls = [
      `/liveStock/getTemperatureLogs?livestockId=${id}&startDate=${start}&endDate=${end}&page=${page}&limit=10`,
      `/liveStock/getHeartbeatLogs?livestockId=${id}&startDate=${start}&endDate=${end}&page=${page}&limit=10`,
      `/liveStock/getStepsLogs?livestockId=${id}&startDate=${start}&endDate=${end}&page=${page}&limit=10`,
      `/liveStock/getActivityLogs?livestockId=${id}&startDate=${start}&endDate=${end}&page=${page}&limit=10`,
    ];
    return urls[activeTab - 1];
  };

  const firstLoad =
    paginationDateFormat(new Date(), "date") ===
      paginationDateFormat(singleSelectedDate, "date") &&
    paginationDateFormat(new Date(), "date") ===
      paginationDateFormat(singleSelectedDate, "date");

  const getChartUrl = (id, step) => {
    const showDateRange = step !== 1 || step !== 2;
    const start = showDateRange
      ? chartDateRange[0]?.startDate
      : singleSelectedDate;
    const end = showDateRange ? chartDateRange[0]?.endDate : singleSelectedDate;
    return `/liveStock/getLiveStockHistory?LiveStockId=${id}&startDate=${paginationDateFormat(
      start,
      "date"
    )}&endDate=${paginationDateFormat(end, "date")}&statusData=${step}`;
  };

  const getChartData = (id) => {
    if (id) {
      setChartDataLoader(true);
      request({ url: getChartUrl(id, activeTab) })
        .then((res) => {
          if (res?.status === 200) {
            const { data } = res?.data;
            const formattedData = data?.map((ele) => ({
              ...ele,
              createdAt: formattedDate(ele?.createdAt, "time"),
            }));
            setHealthChartData(formattedData);
          } else {
            const msg = getErrorMessage(res);
            setHealthChartData([]);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => setChartDataLoader(false));
    }
  };

  const getLogs = (id) => {
    if (id) {
      dispatch({ type: actions.LOADING, payload: true });
      request({ url: logsUrl(id, activeTab) })
        .then((res) => {
          if (res?.status === 200) {
            const { data, dataLength } = res?.data?.data;
            dispatch({
              type: actions.GET_LOGS_DATA,
              payload: { data, dataLength },
            });
          } else {
            const msg = getErrorMessage(res);
            const payload = { data: [], dataLength: 0 };
            dispatch({
              type: actions.GET_LOGS_DATA,
              payload,
            });
            throw new Error(msg);
          }
        })
        .catch((err) => {
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => {
          dispatch({ type: actions.LOADING, payload: false });
        });
    }
  };

  const getHealthCardData = (id) => {
    if (id) {
      request({
        url: `/liveStock/getLivestockInfoData?livestockId=${id}`,
      })
        .then((res) => {
          if (res?.status === 200) {
            const {
              temperature,
              temperatureTime,
              temperatureAlertStatus,
              heartBeat,
              heartBeatTime,
              heartBeatAlertStatus,
              stepsDataObject,
              stepsTime,
              stepsAlertStatus,
              activityTime,
              activityAlertStatus,
              rumination,
              ruminationTime,
              activeTimeInHours,
              activeTimeInMinutes,
              ruminationAlertStatus,
              threshold,
            } = res?.data?.data;
            const formattedData = {
              temperature: temperature || "0",
              temperatureTime: temperatureTime || new Date(),
              temperatureAlertStatus,
              heartbeat: heartBeat || "0",
              heartbeatTime: heartBeatTime || new Date(),
              heartbeatAlertStatus: heartBeatAlertStatus,
              steps: stepsDataObject || "0",
              stepsTime: stepsTime || new Date(),
              stepsAlertStatus: stepsAlertStatus,
              activityHour: activeTimeInHours || "0",
              activityMin: activeTimeInMinutes || "0",
              activityTime: activityTime || new Date(),
              activityAlertStatus,
              rumination: rumination || "0",
              ruminationTime: ruminationTime || new Date(),
              ruminationAlertStatus,
            };
            setHealthCardData({ cardData: formattedData, threshold });
          } else {
            const msg = getErrorMessage(res);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => dispatch({ type: actions.LOADING }));
    }
  };

  const handleLogsPaginationChange = (pageNo) => {
    const action = {
      type: actions.HANDLE_PAGINATION,
      payload: pageNo,
    };
    dispatch(action);
  };

  const handleRefreshButton = (id) => {
    openSnackbarAlert(
      "info",
      "Refresh Button will be available after 30 seconds"
    );
    getHealthCardData(id);
    getChartData(id);
    getLogs(id);
  };

  return (
    <LivestockHealthContext.Provider
      value={{
        getChartData,
        healthChartData,
        getLogs,
        healthLogData,
        handleLogsPaginationChange,
        logsDateRange,
        setLogsDateRange,
        chartDataLoader,
        singleSelectedDate,
        setSingleSelectedDate,
        activeTab,
        setActiveTab,
        chartDateRange,
        setChartDateRange,
        getHealthCardData,
        healthCardData,
        handleRefreshButton,
      }}
    >
      {children}
    </LivestockHealthContext.Provider>
  );
};

export const useLivestockHealthContext = () => {
  return useContext(LivestockHealthContext);
};
