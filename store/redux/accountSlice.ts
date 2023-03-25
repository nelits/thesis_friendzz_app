import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ApiState } from "./types";
import { User, UserFull } from "../../models/User";
import { getUserInfo } from "../../api/userAPI";
import { Hobby } from "../../models/Hobby";

export const loadCurrentUser = createAsyncThunk<
  UserFull,
  never,
  { state: RootState }
>("account/getUserInfo", async (never, { getState, rejectWithValue }) => {
  try {
    return await getUserInfo(getState().authentication.userID);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

type AccountState = {
  currentUser: UserFull;
  loading: ApiState;
  isProfileHeaderMenuVisible: boolean;
};

const initialState: AccountState = {
  currentUser: {
    id: null,
    name: null,
    profileImg: null,
    username: null,
    description: null,
    hobbies: [],
    photos: [],
  } as UserFull,
  loading: ApiState.idle,
  isProfileHeaderMenuVisible: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUserBasicInfo: (state, action: PayloadAction<User>) => {
      state.currentUser.id = action.payload.id;
      state.currentUser.name = action.payload.name;
      state.currentUser.name = action.payload.username;
      state.currentUser.profileImg = action.payload.profileImg;
    },
    setCurrentUserHobbies: (
      state,
      action: PayloadAction<{ hobbies: Hobby[] }>
    ) => {
      state.currentUser.hobbies = action.payload.hobbies;
    },
    setCurrentUserDescription: (state, action: PayloadAction<string>) => {
      state.currentUser.description = action.payload;
    },
    setCurrenUserID: (state, action) => {
      state.currentUser.id = action.payload;
    },
    setCurrenUser: (state, action: PayloadAction<UserFull>) => {
      state.currentUser = action.payload;
    },
    setProfileMenuVisibility: (state, action: PayloadAction<boolean>) => {
      state.isProfileHeaderMenuVisible = action.payload;
    },
    addPhoto: (state, action: PayloadAction<string>) => {
      state.currentUser.photos = [...state.currentUser.photos, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.loading = ApiState.succeeded;
      })
      .addCase(loadCurrentUser.pending, (state) => {
        state.loading = ApiState.pending;
      });
  },
});
export const currentUserIDSelector = (state: RootState): string =>
  state.account.currentUser.id;
export const currentUserSelector = (state: RootState): UserFull =>
  state.account.currentUser;
export const loadingCurrentUser = (state: RootState): ApiState =>
  state.account.loading;
export const isProfileHeaderMenuVisible = (state: RootState): boolean =>
  state.account.isProfileHeaderMenuVisible;

export const {
  setCurrentUserBasicInfo,
  setCurrentUserDescription,
  setCurrenUserID,
  setCurrentUserHobbies,
  setCurrenUser,
  setProfileMenuVisibility,
  addPhoto,
} = accountSlice.actions;

export default accountSlice.reducer;
