import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import jobReducer from "../features/job/jobSlice";
import proposalReducer from "../features/proposal/proposalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    proposal: proposalReducer,
  },
});
