import {
    ClientImg,
    GatewayImg,
    DeviceImg,
    BMImg,
  } from "../../assets";

export const deviceData = [
    {
      id: 1,
      title: "total collars",
      total: 'totalCollars',
      img: ClientImg,
    },
    {
      id: 2,
      title: "total livestocks",
      total: 'totalLiveStock',
      img: GatewayImg,
    },
    {
      id: 3,
      title: "safe livestocks",
      total: 'totalSafeLiveStock',
      img: BMImg,
    },
    {
      id: 4,
      title: "unsafe livestocks",
      total: 'totalUnSafeLiveStock',
      img: DeviceImg,
    },
    {
      id: 5,
      title: "alerts",
      total: 'totalAlerts',
    img: DeviceImg,
    },
  ];