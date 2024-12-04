import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import newsService from "../services/news.service";


export const getnews = createAsyncThunk(
  "api/getnews",
  async ({lang, paramData, page}, thunkAPI) => {
    try {
      const data = await newsService.getNews(lang, paramData, page);
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

export const getnewsbyid = createAsyncThunk(
  "api/getnewsbyid",
  async ({lang, paramData}, thunkAPI) => {
    try {
      const data = await newsService.getNewsbyId(lang, paramData);
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

export const getnewsbydistrict = createAsyncThunk(
  "api/getnewsbydistrict",
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

export const updatenewsbydistrict = createAsyncThunk(
  "api/updatenewsbydistrict",
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
    tagNews:[],
    cityNews:[],
    categoryNews:[],
    authorNews:[]
}

const newsSlice = createSlice({
  name: "api",
  initialState,
  extraReducers: {
    [getnews.fulfilled]: (state, action) => {
      state.homenews = action.payload.showData.data.data
      return state;
    },
    [getnewsbycity.fulfilled]: (state, action) => {
      state.homenews.push(...action.payload.showData.data.data)
      return state;
    },
    [getnewsbyid.fulfilled]: (state, action) => {
      state.detailNews = action.payload.showData.data.data
      return state;
    },
    [getnewsbydistrict.fulfilled]: (state, action) => {
      state.cityNews = action.payload.showData.data.data
      return state;
    },
    [updatenewsbydistrict.fulfilled]: (state, action) => {
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

const { reducer } = newsSlice;
export default reducer;