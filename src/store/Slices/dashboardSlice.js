import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useNavigate } from "react-router-dom";
import { adminRequest } from "../.././requestMethod";
const initialState = {
  Token: [],
  user: null,
};
const adminId = localStorage.getItem("agro_id");

export const handleSignin = createAsyncThunk(
  "data/handleSignup",
  async (data) => {
    // e.preventDefault();
    const body = JSON.stringify({
      email: data.userEmail,
      password: data.userPassword,
    });
    try {
      const response = await adminRequest.post("/site/addsite", body);

      console.log("ressss", response);
    } catch (error) {
      console.log("Catch block ====>", error.message);
    }
  }
);
export const handleGetUser = createAsyncThunk(
  "data/handleGetUser",
  async () => {
    try {
      const response = await adminRequest.get("/user/getclients");

      console.log("ressss", response);
    } catch (error) {
      console.log("Catch block ====>", error.message);
    }
  }
);
export const handleGetLiveStock = createAsyncThunk(
  "data/handleGetLiveStock",
  async () => {
    try {
      const response = await adminRequest.get(`/site/getsite/${adminId}`);

      console.log("ressss", response);
    } catch (error) {
      console.log("Catch block ====>", error.message);
    }
  }
);

// reducer  ......
export const dashboardSlice = createSlice({
  name: "dashboard ",
  initialState,
  reducers: {},

  extraReducers: {
    [handleSignin.pending]: () => {
      console.log("Pending");
    },
    [handleSignin.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully====", payload);

      return {
        ...state,
        user: payload,
      };
    },
    [handleSignin.rejected]: (state, { payload }) => {
      console.log("rejected");
      return { ...state, user: payload };
    },
    [handleGetUser.pending]: () => {
      console.log("Pending");
    },
    [handleGetUser.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully====", payload);

      return {
        ...state,
        user: payload,
      };
    },
    [handleGetUser.rejected]: (state, { payload }) => {
      console.log("rejected");
      return { ...state, user: payload };
    },
    [handleGetLiveStock.pending]: () => {
      console.log("Pending");
    },
    [handleGetLiveStock.fulfilled]: (state, { payload }) => {
      console.log("fetched successfully====", payload);

      return {
        ...state,
        user: payload,
      };
    },
    [handleGetLiveStock.rejected]: (state, { payload }) => {
      console.log("rejected");
      return { ...state, user: payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
