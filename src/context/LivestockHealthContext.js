import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import useDateFormat from "../hooks/useDateFormat";
import useGetColorDynamically from "../hooks/useGetColorDynamically";
import useLivestockContext from "../hooks/useLivestockContext";
import { request } from "../apis/axios-utils";
import { useReducer } from "react";

const LivestockHealthContext = createContext();

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
        loading: !state?.loading,
      };
  }
};

export const LivestockHealthContextProvider = ({ children }) => {
  const [showHealthTab, setShowHealthTab] = useState("temperature");
  const [activeTab, setActiveTab] = useState(1);
  const { formattedDate, getLongDateFormat, paginationDateFormat } =
    useDateFormat();
  const { getDynamicColor } = useGetColorDynamically();
  const [healthChartData, setHealthChartData] = useState([]);
  const [chartDataLoader, setChartDataLoader] = useState(false);
  const [healthLogData, dispatch] = useReducer(reducer, initialState);
  const [singleSelectedDate, setSingleSelectedDate] = useState(new Date());
  const [logsDateRange, setLogsDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [chartDateRange, setChartDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const logsUrl = (id, activeTab) => {
    const urls = [
      `/liveStock/getTemperatureLogs?livestockId=${id}&startDate=${paginationDateFormat(
        logsDateRange?.startDate,
        "date"
      )}&endDate=${paginationDateFormat(logsDateRange?.endDate, "date")}&page=${
        healthLogData?.pagination
      }&limit=10`,
      `/liveStock/getHeartbeatLogs?livestockId=${id}&startDate=${paginationDateFormat(
        logsDateRange?.startDate,
        "date"
      )}&endDate=${paginationDateFormat(logsDateRange?.endDate, "date")}&page=${
        healthLogData?.pagination
      }&limit=10`,
      `/liveStock/getStepsLogs?livestockId=${id}&startDate=${paginationDateFormat(
        logsDateRange?.startDate,
        "date"
      )}&endDate=${paginationDateFormat(logsDateRange?.endDate, "date")}&page=${
        healthLogData?.pagination
      }&limit=10`,
      `/liveStock/getActivityLogs?livestockId=${id}&startDate=${paginationDateFormat(
        logsDateRange?.startDate,
        "date"
      )}&endDate=${paginationDateFormat(logsDateRange?.endDate, "date")}&page=${
        healthLogData?.pagination
      }&limit=10`
     ];
    return urls[activeTab - 1];
  };

  const firstLoad =
    paginationDateFormat(new Date(), "date") ===
      paginationDateFormat(singleSelectedDate, "date") &&
    paginationDateFormat(new Date(), "date") ===
      paginationDateFormat(singleSelectedDate, "date");

  const getChartUrl = (id, step) => {
    const showDateRange = step === 1 || step === 2;
    const start = showDateRange
      ? chartDateRange?.startDate
      : singleSelectedDate;
    const end = showDateRange ? chartDateRange?.endDate : singleSelectedDate;
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
            const msg = res?.response?.data?.message || "Something went wrong!";
            setHealthChartData([]);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          //   if (!firstLoad) openSnackbarAlert("error", err?.message);
        })
        .finally(() => setChartDataLoader(false));
    }
  };

  const getLogs = (id) => {
    if (id) {
      dispatch({ type: actions.LOADING });
      request({ url: logsUrl(id, activeTab) })
        .then((res) => {
          if (res?.status === 200) {
            const { data, dataLength } = res?.data?.data;
            dispatch({
              type: actions.GET_LOGS_DATA,
              payload: { data, dataLength },
            });
          } else {
            const msg = res?.response?.data?.message || "Something went wrong!";
            const payload = { data: [], dataLength: 0 };
            dispatch({
              type: actions.GET_LOGS_DATA,
              payload,
            });
            throw new Error(msg);
          }
        })
        .catch((err) => {
          //   if (!firstLoad) openSnackbarAlert("error", err?.message);
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
      }}
    >
      {children}
    </LivestockHealthContext.Provider>
  );
};

export const useLivestockHealthContext = () => {
  return useContext(LivestockHealthContext);
};
