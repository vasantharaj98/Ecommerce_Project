import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import EventBus from "../utils/EventBus";
import productService from "../services/product.service";

export const getproduct = createAsyncThunk(
  "product/getproduct",
  async ( thunkAPI) => {
    try {
      const response = await productService.getProduct();
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

export const createproduct = createAsyncThunk(
  "product/createproduct",
  async (paydata, thunkAPI) => {
    try {
      const response = await productService.createProduct(paydata);
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

export const updateproduct = createAsyncThunk(
  "api/updateproduct",
  async ({c_id, paydata}, thunkAPI) => {
    try {
      const response = await productService.updateProduct(c_id, paydata);
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

export const deleteproduct = createAsyncThunk(
  "api/deleteproduct",
  async ({c_id}, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(c_id);
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
    product: [],
    message: null
}

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: {
    [createproduct.fulfilled]: (state, action) => {
      state.product.push(action.payload.apidata.data);
      return state;
    },
    [createproduct.rejected]: (state, action) => {
      return state;
    },
    [getproduct.fulfilled]: (state, action) => {
      state.product = action.payload.apidata.data;
      return state;
    },
    [getproduct.rejected]: (state, action) => {
      return state;
    },
    [updateproduct.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.product = state.product.map((item) =>
          item.id === c_id ? action.payload.apidata.data : item
        );
      };
    },
    [deleteproduct.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.product = state.product.filter((item) => item.id !== c_id);
      };
    },
  },
});

const { reducer } = productSlice;
export default reducer;