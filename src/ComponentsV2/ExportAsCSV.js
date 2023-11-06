import React from "react";
import { CSVLink } from "react-csv";

const tableHeadData = [
    {
        label:"alert name", 
        key:"alertName"
    },
    {
        label:"Collar UID", 
        key:"collarUID"
    },
    {
        label:"Livestock name", 
        key:"livestockName"
    },{
        label:"threshold value", 
        key:"thresholdValue"
    },{
        label:"alert value", 
        key:"alarmValue"
    },
    {
        label:"time", 
        key:"time"
    },
    {
        label:"date", 
        key:"date"
    },
];
const tableRowData = [
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
  {
    alertName: "high temperature alert",
    collarUID: "C_1",
    livestockName: "Mori",
    thresholdValue: "40 C",
    alarmValue: "42 C",
    time: "17:50 PM",
    date: "23/09/23",
  },
];

const ExportAsCSV = ({headers, data, fileName}) => {
  return (
    <div>
      <CSVLink
        data={data}
        headers={headers}
        filename={fileName}
        target="_blank"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default ExportAsCSV;
