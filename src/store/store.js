import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "../store/Slices/dashboardSlice";

const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
export default store;
