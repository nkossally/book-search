import { configureStore, combineReducers } from "@reduxjs/toolkit";
import savedBooksReducer from "./savedBooksSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  safelist: ["savedBooks"]
};

const rootReducer = combineReducers({
  savedBooks: savedBooksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
