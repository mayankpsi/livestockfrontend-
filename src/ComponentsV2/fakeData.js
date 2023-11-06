import CustomLabel from "../../ComponentsV2";
import {VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon} from '../icons';

export const collarsData = [
    {
      collarID: "C_1",
      collarName: "collar 1",
      power: <CustomLabel text="ON" type="success" width={80} />,
      currentStatus: <CustomLabel text="assigned" type="success" width={90} />,
      status:'assigned',
      addedOn: "07/07/23",
      action: [
          <VisibilityOutlinedIcon fontSize="large" onClick={() => alert("view")} />,
          <DeleteOutlineOutlinedIcon fontSize="large" onClick={() => alert("delete")} />,
        ],
    },
    {
      collarID: "C_1",
      collarName: "collar 1",
      power: <CustomLabel text="OFF" type="error" width={80} />,
      currentStatus: <CustomLabel text="not assigned" type="error" width={125} />,
      status:'not assigned',
      addedOn: "07/07/23",
      action:[
        <VisibilityOutlinedIcon fontSize="large" onClick={() => {}} />,
        <DeleteOutlineOutlinedIcon fontSize="large" onClick={() => {}} />,
      ],
    },
    {
      collarID: "C_1",
      collarName: "collar 1",
      power: <CustomLabel text="ON" type="success" width={80} />,
      currentStatus: <CustomLabel text="assigned" type="success" width={90} />,
      status:'assigned',
      addedOn: "07/07/23",
      action:[
        <VisibilityOutlinedIcon fontSize="large" onClick={() => {}} />,
        <DeleteOutlineOutlinedIcon fontSize="large" onClick={() => {}} />,
      ],
    },
    {
      collarID: "C_1",
      collarName: "collar 1",
      power: <CustomLabel text="OFF" type="error" width={80} />,
      currentStatus: <CustomLabel text="not assigned" type="error" width={125} />,
      status:'not assigned',
      addedOn: "07/07/23",
      action:[
        <VisibilityOutlinedIcon fontSize="large" onClick={() => {}} />,
        <DeleteOutlineOutlinedIcon fontSize="large" onClick={() => {}} />,
      ],
    },
    {
      collarID: "C_1",
      collarName: "collar 1",
      power: <CustomLabel text="ON" type="success" width={80} />,
      currentStatus: <CustomLabel text="assigned" type="success" width={90} />,
      status:'assigned',
      addedOn: "07/07/23",
      action: [
        <VisibilityOutlinedIcon fontSize="large" onClick={() => {}} />,
        <DeleteOutlineOutlinedIcon fontSize="large" onClick={() => {}} />,
      ],
    },
  ];