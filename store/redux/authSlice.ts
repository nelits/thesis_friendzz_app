import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebaseConfig";

export const logOutUser = createAsyncThunk("auth/logout", async () => {
  try {
    return await signOut(firebaseAuth);
  } catch (err) {
    console.log("Log out user ", err);
  }
});

const initialState = {
  userID: null,
  moreInfoFlowIsOver: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
    endMoreInfoFlow: (state) => {
      state.moreInfoFlowIsOver = true;
    },
    clearState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.userID = null;
      state.moreInfoFlowIsOver = false;
    });
  },
});

export const { authenticate, endMoreInfoFlow, clearState } = authSlice.actions;

export const userID = (state) => state.authentication.userID;
export const isAuthenticated = (state): boolean =>
  !!state.authentication.userID;
export const isMoreInfoFlowOverSelector = (state): boolean =>
  state.authentication.moreInfoFlowIsOver;

export default authSlice.reducer;
