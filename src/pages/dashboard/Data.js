import {
    TotalCollars,
    TotalLivestock,
    UnsafeLivestock,
    SafeLivestock,
    AlertsDash
  } from "../../assets";

export const deviceData = [
    {
      id: 1,
      title: "total Devices",
      total: 'totalCollars',
      img: TotalCollars,
    },
    {
      id: 2,
      title: "total livestocks",
      total: 'totalLiveStock',
      img: TotalLivestock,
    },
    {
      id: 3,
      title: "safe livestocks",
      total: 'totalSafeLiveStock',
      img: SafeLivestock,
    },
    {
      id: 4,
      title: "unsafe livestocks",
      total: 'totalUnSafeLiveStock',
      img: UnsafeLivestock,
    },
    {
      id: 5,
      title: "alerts",
      total: 'totalAlerts',
    img: AlertsDash,
    },
  ];