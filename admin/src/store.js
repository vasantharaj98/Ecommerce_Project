import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import categoryReducer from "./slices/category";
import subcategoryReducer from "./slices/subcategory";
import productReducer from "./slices/product";
import bannerReducer from "./slices/banner";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  category: categoryReducer,
  subcategory: subcategoryReducer,
  product: productReducer,
  banner: bannerReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export default store;