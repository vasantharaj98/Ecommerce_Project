import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import newsService from "../services/news.service";
import ecommerceService from "../services/ecommerce.service";


export const getproduct = createAsyncThunk(
  "api/getproduct",
  async ( thunkAPI) => {
    try {
      const data = await ecommerceService.getProduct();
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getnewsbycity = createAsyncThunk(
  "api/getnewsbycity",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbycity(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getproductbyid = createAsyncThunk(
  "api/getproductbyid",
  async ({p_id}, thunkAPI) => {
    try {
      const data = await ecommerceService.getProductbyId(p_id);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getproductbysubcategory = createAsyncThunk(
  "api/getproductbysubcategory",
  async ({paramData, page}, thunkAPI) => {
    try {
      const data = await ecommerceService.getProductbysubcategory(paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateproductbysubcategory = createAsyncThunk(
  "api/updateproductbysubcategory",
  async ({paramData, page}, thunkAPI) => {
    try {
      const data = await ecommerceService.getProductbysubcategory(paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getnewsbytag = createAsyncThunk(
  "api/getnewsbytag",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyTag(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatenewsbytag = createAsyncThunk(
  "api/updatenewsbytag",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyTag(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getcategory = createAsyncThunk(
  "api/getcategory",
  async ( thunkAPI) => {
    try {
      const data = await ecommerceService.getCategory();
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getbanner = createAsyncThunk(
  "api/getbanner",
  async ( thunkAPI) => {
    try {
      const data = await ecommerceService.getBanner();
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatenewsbycategory = createAsyncThunk(
  "api/updatenewsbycategory",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyCategory(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getnewsbyauthor = createAsyncThunk(
  "api/getnewsbyauthor",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyAuthor(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatenewsbyauthor = createAsyncThunk(
  "api/updatenewsbyauthor",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyAuthor(lang, paramData, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addcart = createAsyncThunk(
  "api/addcart",
  async (paydata, thunkAPI) => {
    try {
      const data = await ecommerceService.addCart(paydata);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getcart = createAsyncThunk(
  "api/getcart",
  async ({c_id, page}, thunkAPI) => {
    try {
      const data = await ecommerceService.getCart(c_id, page);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updatecart = createAsyncThunk(
  "api/updatecart",
  async ({c_id, paydata}, thunkAPI) => {
    try {
      const data = await ecommerceService.updateCart(c_id, paydata);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deletecart = createAsyncThunk(
  "api/deletecart",
  async ({c_id}, thunkAPI) => {
    try {
      const data = await ecommerceService.deleteCart(c_id);
      return { showData: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState ={
    banner:[],
    product: [],
    detailProduct:"",
    tagNews:[],
    subProduct:[],
    category:[],
    authorNews:[],
    cart:[]
}

const ecommerceSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getproduct.fulfilled]: (state, action) => {
      state.product = action.payload.showData.data.data
      return state;
    },
    [getnewsbycity.fulfilled]: (state, action) => {
      state.homenews.push(...action.payload.showData.data.data)
      return state;
    },
    [getproductbyid.fulfilled]: (state, action) => {
      state.detailProduct = action.payload.showData.data.data
      return state;
    },
    [getproductbysubcategory.fulfilled]: (state, action) => {
      state.subProduct = action.payload.showData.data.data
      return state;
    },
    [updateproductbysubcategory.fulfilled]: (state, action) => {
      state.subProduct.push(...action.payload.showData.data.data)
      return state;
    },
    [getnewsbytag.fulfilled]: (state, action) => {
      state.tagNews = action.payload.showData.data.data
      return state;
    },
    [updatenewsbytag.fulfilled]: (state, action) => {
      state.tagNews.push(...action.payload.showData.data.data)
      return state;
    },
    [getbanner.fulfilled]: (state, action) => {
      state.banner = action.payload.showData.data.data
      return state;
    },
    [getcategory.fulfilled]: (state, action) => {
      state.category = action.payload.showData.data.data
      return state;
    },
    [updatenewsbycategory.fulfilled]: (state, action) => {
      state.categoryNews.push(...action.payload.showData.data.data)
      return state;
    },
    [getnewsbyauthor.fulfilled]: (state, action) => {
      state.authorNews = action.payload.showData.data.data
      return state;
    },
    [updatenewsbyauthor.fulfilled]: (state, action) => {
      state.authorNews.push(...action.payload.showData.data.data)
      return state;
    },
    [addcart.fulfilled]: (state, action) => {
      state.cart.push(action.payload.showData.data.data)
      return state;
    },
    [getcart.fulfilled]: (state, action) => {
      state.cart = action.payload.showData.data.data
      return state;
    },
    [updatecart.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.cart = state.cart.map((item) =>
          item.id === c_id ? action.payload.showData.data.data : item
        );
      };
    },
    [deletecart.fulfilled]: (state, action) => {
      const {
        arg: { c_id },
      } = action.meta;
      if (c_id) {
        state.cart = state.cart.filter((item) => item.id !== c_id);
      };
    },
  },
});

const { reducer } = ecommerceSlice;
export default reducer;