import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import jobSlice from "./features/jobs/jobSlice";
import alljobsSlice from "./features/jobs/alljobsSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: alljobsSlice,
  },
});
export default store;
