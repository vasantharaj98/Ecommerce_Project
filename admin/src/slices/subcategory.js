import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import EventBus from "../utils/EventBus";
import subCategoryService from "../services/subcategory.service";


export const getsubcategory = createAsyncThunk(
  "product/getsubcategory",
  async ( thunkAPI) => {
    try {
      const response = await subCategoryService.getSubCategory();
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

export const createsubcategory = createAsyncThunk(
  "product/createsubcategory",
  async (paydata, thunkAPI) => {
    try {
      const response = await subCategoryService.createSubCategory(paydata);
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

export const updatesubcategory = createAsyncThunk(
  "api/updatesubcategory",
  async ({c_id, paydata}, thunkAPI) => {
    try {
      const response = await subCategoryService.updateSubCategory(c_id, paydata);
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

export const deletesubcategory = createAsyncThunk(
  "api/deletesubcategory",
  async ({c_id}, thunkAPI) => {
    try {
      const response = await subCategoryService.deleteSubCategory(c_id);
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
    subcategory: [],
    message: null
}

const subCategorySlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [createsubcategory.fulfilled]: (state, action) => {
      state.subcategory.push(action.payload.apidata.data);
      return state;
    },
    [createsubcategory.rejected]: (state, action) => {
      return state;
    },
    [getsubcategory.fulfilled]: (state, action) => {
      state.subcategory = action.payload.apidata.data;
      return state;
    },
    [getsubcategory.rejected]: (state, action) => {
      return state;
    },
    [updatesubcategory.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.subcategory = state.subcategory.map((item) =>
          item.id === c_id ? action.payload.apidata.data : item
        );
      };
    },
    [deletesubcategory.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.subcategory = state.subcategory.filter((item) => item.id !== c_id);
      };
    },
  },
});

const { reducer } = subCategorySlice;
export default reducer;