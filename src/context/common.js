import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const Loader = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADER':
      return { ...state, loading: action.value };

    default: {
      throw new Error(`action type : ${action.type}`);
    }
  }
};

function LoaderControllerProvider({ children }) {
  const initialState = {
    loading: false,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  // const provider = useMemo(() => [controller, dispatch], []);
  // eslint-disable-next-line
  return (
    <Loader.Provider value={[controller, dispatch]}>{children}</Loader.Provider>
  );
}

// Typechecking props for the FilterControllerProvider
LoaderControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useLoaderController = () => {
  const context = useContext(Loader);
  if (!context) {
    throw new Error(
      'useLoaderController should be used inside the loaderControllerProvider.'
    );
  }
  return context;
};

const setLoader = (dispatch, value) => dispatch({ type: 'LOADER', value });

export { LoaderControllerProvider, useLoaderController, setLoader };
