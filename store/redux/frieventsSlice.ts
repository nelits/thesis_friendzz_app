import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ApiState } from "./types";
import { Frievent } from "../../models/Frievent";
import { getFrievents } from "../../api/frieventsAPI";

export const loadFrievents = createAsyncThunk<Frievent[]>(
  "frievents/load",
  async (never, { rejectWithValue }) => {
    try {
      return await getFrievents();
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

type FrieventState = {
  frievents: Frievent[];
  loading: ApiState;
};

const initialState: FrieventState = {
  frievents: [],
  loading: ApiState.idle,
};

const frieventSlice = createSlice({
  name: "frievents",
  initialState,
  reducers: {
    setFrievents: (state, action) => {
      state.frievents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFrievents.fulfilled, (state, action) => {
        state.frievents = action.payload;
        state.loading = ApiState.succeeded;
      })
      .addCase(loadFrievents.pending, (state) => {
        state.loading = ApiState.pending;
      });
  },
});

export const frieventSelectorByID = (
  state: RootState,
  frieventID: string
): Frievent => state.frievents.frievents.find((f) => f.id === frieventID);
export const frieventsSelector = (state: RootState): Frievent[] =>
  state.frievents.frievents;
export const loadingFrievents = (state: RootState): ApiState =>
  state.frievents.loading;

export const getFrieventByIdSelector = (frieventID: string) =>
  createSelector(frieventsSelector, (frievents) => {
    return frievents.find((f) => f.id === frieventID);
  });

export const filterFrieventsByCategoryAndPlace = (
  categoryID: string | null,
  placeDescription: string | null
) =>
  createSelector(frieventsSelector, (frievents) => {
    const filteredFrievents =
      categoryID === null
        ? frievents.filter((f) => f.date > new Date().getTime())
        : frievents.filter(
            (f) => f.category.id === categoryID && f.date > new Date().getTime()
          );

    if (placeDescription) {
      return filteredFrievents.filter(
        (f) => f.place.description === placeDescription
      );
    }

    return filteredFrievents;
  });

export const { setFrievents } = frieventSlice.actions;
export default frieventSlice.reducer;
