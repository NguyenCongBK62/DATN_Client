import { configureStore } from "@reduxjs/toolkit";
import ToastReducer from "./modules/AlertToast";
import JobReducer from "./modules/Job";
import AuthReducer from "./modules/Auth";
export default configureStore({
  reducer: {
    ToastStatus: ToastReducer,
    job: JobReducer,
    Auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
