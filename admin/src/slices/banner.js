import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import EventBus from "../utils/EventBus";
import bannerService from "../services/banner.service";


export const getbanner = createAsyncThunk(
  "product/getbanner",
  async ( thunkAPI) => {
    try {
      const response = await bannerService.getBanner();
      return { apidata: response.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const createbanner = createAsyncThunk(
  "product/createbanner",
  async (paydata, thunkAPI) => {
    try {
      const response = await bannerService.createBanner(paydata);
      thunkAPI.dispatch(setMessage(response.data.message));
      return { apidata: response.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatebanner = createAsyncThunk(
  "product/updatebanner",
  async ({c_id, paydata}, thunkAPI) => {
    try {
      const response = await bannerService.updateBanner(c_id, paydata);
      return { apidata: response.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deletebanner = createAsyncThunk(
  "product/deletebanner",
  async ({c_id}, thunkAPI) => {
    try {
      const response = await bannerService.deleteBanner(c_id);
      return { apidata: response.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log(error.response.status);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          EventBus.dispatch("logout");
        }
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState ={
    banner: [],
    message: null
}

const bannerSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [createbanner.fulfilled]: (state, action) => {
      state.banner.push(action.payload.apidata.data);
      return state;
    },
    [createbanner.rejected]: (state, action) => {
      return state;
    },
    [getbanner.fulfilled]: (state, action) => {
      state.banner = action.payload.apidata.data;
      return state;
    },
    [getbanner.rejected]: (state, action) => {
      return state;
    },
    [updatebanner.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.banner = state.banner.map((item) =>
          item.id === c_id ? action.payload.apidata.data : item
        );
      };
    },
    [deletebanner.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.banner = state.banner.filter((item) => item.id !== c_id);
      };
    },
  },
});

const { reducer } = bannerSlice;
export default reducer;