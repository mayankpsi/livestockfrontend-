import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const AddSite = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "GATEWAY_ID":
      return { ...state, gatewayId: action.value };
    case "GATEWAY_NAME":
      return { ...state, gatewayName: action.value };
    case "GATEWAY_FULLADDRESS":
      return { ...state, gatewayAddress: action.value };
    case "GATEWAY_PINCODE":
      return { ...state, gatewayPincode: action.value };
    case "GATEWAY_CITY":
      return { ...state, gatewayCity: action.value };
    case "GATEWAY_STATE":
      return { ...state, gatewayState: action.value };
    case "GATEWAY_COUNTRY":
      return { ...state, gatewayCountry: action.value };
    case "GATEWAY_LATITUDE":
      return { ...state, gatewayGeoLatitude: action.value };
    case "GATEWAY_LONGITUDE":
      return { ...state, gatewayGeoLongitude: action.value };

    case "BRANCH_ID":
      return { ...state, branchId: action.value };
    case "BRANCH_NAME":
      return { ...state, branchName: action.value };
    case "BRANCH_DEPTH1":
      return { ...state, branchDepth1: action.value };
    case "BRANCH_DEPTH2":
      return { ...state, branchDepth2: action.value };
    case "BRANCH_DEPTH3":
      return { ...state, branchDepth3: action.value };
    case "BRANCH_FULLADDRESS":
      return { ...state, branchAddress: action.value };
    case "BRANCH_PINCODE":
      return { ...state, branchPincode: action.value };
    case "BRANCH_CITY":
      return { ...state, branchCity: action.value };
    case "BRANCH_STATE":
      return { ...state, branchState: action.value };
    case "BRANCH_COUNTRY":
      return { ...state, branchCountry: action.value };
    case "BRANCH_LATITUDE":
      return { ...state, branchGeoLatitude: action.value };
    case "BRANCH_LONGITUDE":
      return { ...state, branchGeoLongitude: action.value };

    case "NODE_DATA":
      return { ...state, nodeData: action.value };

    default: {
      throw new Error(`action type : ${action.type}`);
    }
  }
};

function AddSiteControllerProvider({ children }) {
  const initialState = {
    gatewayId: "",
    gatewayName: "",
    gatewayAddress: "",
    gatewayPincode: "",
    gatewayCity: "",
    gatewayState: "",
    gatewayCountry: "",
    gatewayGeoLongitude: "",
    gatewayGeoLatitude: "",

    branchId: "",
    branchName: "",
    branchDepth1: "0",
    branchDepth2: "0",
    branchDepth3: "0",
    branchAddress: "",
    branchPincode: "",
    branchCity: "",
    branchState: "",
    branchCountry: "",
    branchGeoLatitude: "",
    branchGeoLongitude: "",

    nodeData: [
      {
        id: "node#1",
        nodeID: "",
        nodeName: "",
        depth1: "0",
        depth2: "0",
        depth3: "0",
        nodeAddress: "",
        nodePincode: "",
        nodeCity: "",
        nodeState: "",
        nodeCountry: "",
        nodeGeoLatitude: "",
        nodeGeoLongitude: "",
      },
    ],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  // const provider = useMemo(() => [controller, dispatch], []);
  // eslint-disable-next-line
  return (
    <AddSite.Provider value={[controller, dispatch]}>
      {children}
    </AddSite.Provider>
  );
}

// Typechecking props for the FilterControllerProvider
AddSiteControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAddSiteController = () => {
  const context = useContext(AddSite);
  if (!context) {
    throw new Error(
      "useAddSiteController should be used inside the addSiteControllerProvider."
    );
  }
  return context;
};

const setGatewayId = (dispatch, value) =>
  dispatch({ type: "GATEWAY_ID", value });

const setGatewayName = (dispatch, value) =>
  dispatch({ type: "GATEWAY_NAME", value });

const setGatewayAddress = (dispatch, value) =>
  dispatch({ type: "GATEWAY_FULLADDRESS", value });

const setGatewayPincode = (dispatch, value) =>
  dispatch({ type: "GATEWAY_PINCODE", value });

const setGatewayCity = (dispatch, value) =>
  dispatch({ type: "GATEWAY_CITY", value });

const setGatewayState = (dispatch, value) =>
  dispatch({ type: "GATEWAY_STATE", value });

const setGatewayCountry = (dispatch, value) =>
  dispatch({ type: "GATEWAY_COUNTRY", value });

const setGatewayGeoLatitude = (dispatch, value) =>
  dispatch({ type: "GATEWAY_LATITUDE", value });

const setGatewayGeoLongitude = (dispatch, value) =>
  dispatch({ type: "GATEWAY_LONGITUDE", value });

const setBranchId = (dispatch, value) => dispatch({ type: "BRANCH_ID", value });

const setBranchName = (dispatch, value) =>
  dispatch({ type: "BRANCH_NAME", value });

const setBranchDepth1 = (dispatch, value) =>
  dispatch({ type: "BRANCH_DEPTH1", value });

const setBranchDepth2 = (dispatch, value) =>
  dispatch({ type: "BRANCH_DEPTH2", value });

const setBranchDepth3 = (dispatch, value) =>
  dispatch({ type: "BRANCH_DEPTH3", value });

const setBranchAddress = (dispatch, value) =>
  dispatch({ type: "BRANCH_FULLADDRESS", value });

const setBranchPincode = (dispatch, value) =>
  dispatch({ type: "BRANCH_PINCODE", value });

const setBranchCity = (dispatch, value) =>
  dispatch({ type: "BRANCH_CITY", value });

const setBranchState = (dispatch, value) =>
  dispatch({ type: "BRANCH_STATE", value });

const setBranchCountry = (dispatch, value) =>
  dispatch({ type: "BRANCH_COUNTRY", value });

const setBranchGeoLatitude = (dispatch, value) =>
  dispatch({ type: "BRANCH_LATITUDE", value });

const setBranchGeoLongitude = (dispatch, value) =>
  dispatch({ type: "BRANCH_LONGITUDE", value });

const setNodeData = (dispatch, value) => dispatch({ type: "NODE_DATA", value });

export {
  AddSiteControllerProvider,
  useAddSiteController,
  setGatewayId,
  setGatewayName,
  setGatewayAddress,
  setGatewayPincode,
  setGatewayCity,
  setGatewayState,
  setGatewayCountry,
  setGatewayGeoLatitude,
  setGatewayGeoLongitude,
  setBranchId,
  setBranchName,
  setBranchDepth1,
  setBranchDepth2,
  setBranchDepth3,
  setBranchAddress,
  setBranchPincode,
  setBranchCity,
  setBranchState,
  setBranchCountry,
  setBranchGeoLatitude,
  setBranchGeoLongitude,
  setNodeData,
};
