import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AddBm = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'BRANCH_ID':
      return { ...state, branchId: action.value };
    case 'BRANCH_NAME':
      return { ...state, branchName: action.value };
    case 'BRANCH_DEPTH1':
      return { ...state, branchDepth1: action.value };
    case 'BRANCH_DEPTH2':
      return { ...state, branchDepth2: action.value };
    case 'BRANCH_DEPTH3':
      return { ...state, branchDepth3: action.value };
    case 'BRANCH_FULLADDRESS':
      return { ...state, branchAddress: action.value };
    case 'BRANCH_PINCODE':
      return { ...state, branchPincode: action.value };
    case 'BRANCH_CITY':
      return { ...state, branchCity: action.value };
    case 'BRANCH_STATE':
      return { ...state, branchState: action.value };
    case 'BRANCH_COUNTRY':
      return { ...state, branchCountry: action.value };
    case 'BRANCH_LATITUDE':
      return { ...state, branchGeoLatitude: action.value };
    case 'BRANCH_LONGITUDE':
      return { ...state, branchGeoLongitude: action.value };

    case 'NODE_DATA':
      return { ...state, nodeData: action.value };

    default: {
      throw new Error(`action type : ${action.type}`);
    }
  }
};

function AddBmControllerProvider({ children }) {
  const initialState = {
    branchId: '',
    branchName: '',
    branchDepth1: '',
    branchDepth2: '',
    branchDepth3: '',
    branchAddress: '',
    branchPincode: '',
    branchCity: '',
    branchState: '',
    branchCountry: '',
    branchGeoLatitude: '',
    branchGeoLongitude: '',

    nodeData: [
      {
        id: 'node#1',
        nodeID: '',
        nodeName: '',
        depth1: '',
        depth2: '',
        depth3: '',
        nodeAddress: '',
        nodePincode: '',
        nodeCity: '',
        nodeState: '',
        nodeCountry: '',
        nodeGeoLatitude: '',
        nodeGeoLongitude: '',
      },
    ],
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  // const provider = useMemo(() => [controller, dispatch], []);
  // eslint-disable-next-line
  return (
    <AddBm.Provider value={[controller, dispatch]}>{children}</AddBm.Provider>
  );
}

// Typechecking props for the FilterControllerProvider
AddBmControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAddBmController = () => {
  const context = useContext(AddBm);
  if (!context) {
    throw new Error(
      'useAddSiteController should be used inside the addSiteControllerProvider.'
    );
  }
  return context;
};

const setBranchId = (dispatch, value) => dispatch({ type: 'BRANCH_ID', value });

const setBranchName = (dispatch, value) =>
  dispatch({ type: 'BRANCH_NAME', value });

const setBranchDepth1 = (dispatch, value) =>
  dispatch({ type: 'BRANCH_DEPTH1', value });

const setBranchDepth2 = (dispatch, value) =>
  dispatch({ type: 'BRANCH_DEPTH2', value });

const setBranchDepth3 = (dispatch, value) =>
  dispatch({ type: 'BRANCH_DEPTH3', value });

const setBranchAddress = (dispatch, value) =>
  dispatch({ type: 'BRANCH_FULLADDRESS', value });

const setBranchPincode = (dispatch, value) =>
  dispatch({ type: 'BRANCH_PINCODE', value });

const setBranchCity = (dispatch, value) =>
  dispatch({ type: 'BRANCH_CITY', value });

const setBranchState = (dispatch, value) =>
  dispatch({ type: 'BRANCH_STATE', value });

const setBranchCountry = (dispatch, value) =>
  dispatch({ type: 'BRANCH_COUNTRY', value });

const setBranchGeoLatitude = (dispatch, value) =>
  dispatch({ type: 'BRANCH_LATITUDE', value });

const setBranchGeoLongitude = (dispatch, value) =>
  dispatch({ type: 'BRANCH_LONGITUDE', value });

const setNodeData = (dispatch, value) => dispatch({ type: 'NODE_DATA', value });

export {
  AddBmControllerProvider,
  useAddBmController,
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
