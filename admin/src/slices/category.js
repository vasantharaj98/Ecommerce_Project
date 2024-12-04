import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import CategoryService from "../services/category.service";
import EventBus from "../utils/EventBus";


export const getcategory = createAsyncThunk(
  "product/getcategory",
  async ( thunkAPI) => {
    try {
      const response = await CategoryService.getCategory();
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

export const createcategory = createAsyncThunk(
  "product/createcategory",
  async (paydata, thunkAPI) => {
    try {
      const response = await CategoryService.createCategory(paydata);
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

export const updatecategory = createAsyncThunk(
  "api/updatecategory",
  async ({c_id, paydata}, thunkAPI) => {
    try {
      const response = await CategoryService.updateCategory(c_id, paydata);
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

export const deletecategory = createAsyncThunk(
  "api/deletecategory",
  async ({c_id}, thunkAPI) => {
    try {
      const response = await CategoryService.deleteCategory(c_id);
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
    category: [],
    message: null
}

const categorySlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [createcategory.fulfilled]: (state, action) => {
      state.category.push(action.payload.apidata.data);
      return state;
    },
    [createcategory.rejected]: (state, action) => {
      return state;
    },
    [getcategory.fulfilled]: (state, action) => {
      state.category = action.payload.apidata.data;
      return state;
    },
    [getcategory.rejected]: (state, action) => {
      return state;
    },
    [updatecategory.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.category = state.category.map((item) =>
          item.id === c_id ? action.payload.apidata.data : item
        );
      };
    },
    [deletecategory.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.category = state.category.filter((item) => item.id !== c_id);
      };
    },
  },
});

const { reducer } = categorySlice;
export default reducer;