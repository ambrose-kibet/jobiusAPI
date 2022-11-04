import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch, getLocalStorage } from "../../utils";

import { getAllJobs, hideLoading, showLoading } from "./alljobsSlice";
import { checkError } from "../../utils";
const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobType: "full-time",
  jobTypeOptions: ["remote", "full-time", "part-time", "internship"],
  jobLocation: "",
  statusOptions: ["interview", "pending", "declined"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/jobs", job, {
        withCredentials: true,
      });

      thunkAPI.dispatch(clearValues());
      return data.job;
    } catch (error) {
      checkError(error, thunkAPI);
    }
  }
);
export const editJob = createAsyncThunk(
  "job/editJob",
  async (job, thunkAPI) => {
    try {
      const { data } = await customFetch.patch(`/jobs/${job.editJobId}`, job, {
        withCredentials: true,
      });
      thunkAPI.dispatch(clearValues());

      return data;
    } catch (error) {
      checkError(error, thunkAPI);
    }
  }
);
export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
      const { data } = await customFetch.delete(`/jobs/${jobId}`, {
        withCredentials: true,
      });
      thunkAPI.dispatch(getAllJobs());
      console.log(data);
      return data;
    } catch (error) {
      thunkAPI.dispatch(hideLoading());
      checkError(error, thunkAPI);
    }
  }
);
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getLocalStorage("user")?.location || "",
      };
    },
    setEditing: (state, { payload }) => {
      return { ...initialState, ...payload, isEditing: true };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success("Job created successfully");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload: { msg } }) => {
      toast.success(msg);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success("job updated");
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { handleInput, clearValues, setEditing } = jobSlice.actions;
export default jobSlice.reducer;
