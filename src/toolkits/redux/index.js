import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";

import authReducer from "./auth";
import settingReducer from "./setting";
import counterReducer from "./counter";

const reducers = combineReducers({
  auth: authReducer,
  setting: settingReducer,
  counter: counterReducer,
});

const persistConfig = {
  storage,
  key: "primary",
  whitelist: ["setting", "auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ],
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
