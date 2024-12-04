import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import newsReducer from "./slices/news";
import liveNewsReducer from "./slices/livenews";
import ecommerceReducer from "./slices/ecommerce";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  news: newsReducer,
  liveNews: liveNewsReducer,
  ecommerce: ecommerceReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store;