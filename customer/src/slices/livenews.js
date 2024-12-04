import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import newsService from "../services/news.service";
import liveNewsService from "../services/livenews.service";



export const getlivenews = createAsyncThunk(
  "api/getlivenews",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await liveNewsService.getLiveNews(lang, paramData, page);
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

export const getcities = createAsyncThunk(
  "api/getcities",
  async (thunkAPI) => {
    try {
      const data = await liveNewsService.getCities();
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

export const getlivenewsbyid = createAsyncThunk(
  "api/getlivenewsbyid",
  async ({lang, paramData}, thunkAPI) => {
    try {
      const data = await liveNewsService.getLiveNewsbyId(lang, paramData);
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

export const getlivenewsbycity = createAsyncThunk(
  "api/getlivenewsbycity",
  async ({lang, paramData}, thunkAPI) => {
    try {
      const data = await liveNewsService.getLiveCityNews(lang, paramData);
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

export const updatelivenewsbycity = createAsyncThunk(
  "api/updatelivenewsbycity",
  async ({lang, paramData}, thunkAPI) => {
    try {
      const data = await liveNewsService.getLiveCityNews(lang, paramData);
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

export const getnewsbycategory = createAsyncThunk(
  "api/getnewsbycategory",
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

const initialState ={
    homenews: [],
    detailNews:"",
    cities:[],
    tagNews:[],
    cityNews:[],
    categoryNews:[],
    authorNews:[]
}

const liveNewsSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getlivenews.fulfilled]: (state, action) => {
      state.homenews = action.payload.showData.data.data
      return state;
    },
    [getcities.fulfilled]: (state, action) => {
      state.cities = action.payload.showData.data.data
      return state;
    },
    [getlivenewsbyid.fulfilled]: (state, action) => {
      state.detailNews = action.payload.showData.data.data
      return state;
    },
    [getlivenewsbycity.fulfilled]: (state, action) => {
      state.cityNews = action.payload.showData.data.data
      return state;
    },
    [updatelivenewsbycity.fulfilled]: (state, action) => {
      state.cityNews.push(...action.payload.showData.data.data)
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
    [getnewsbycategory.fulfilled]: (state, action) => {
      state.categoryNews = action.payload.showData.data.data
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
  },
});

const { reducer } = liveNewsSlice;
export default reducer;