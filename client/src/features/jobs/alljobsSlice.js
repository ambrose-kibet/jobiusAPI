import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customFetch } from "../../utils";
import { checkError } from "../../utils";
const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFilterState,
};
export const getAllJobs = createAsyncThunk(
  "allJobs/getAlljos",
  async (_, thunkAPI) => {
    const { page, search, searchType, searchStatus, sort } =
      thunkAPI.getState().allJobs;
    let url = `/jobs?page=${page}&status=${searchStatus}&type=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    try {
      const { data } = await customFetch.get(url, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      checkError(error, thunkAPI);
    }
  }
);
export const showStats = createAsyncThunk(
  "allJobs/showStats",
  async (_, thunkAPI) => {
    try {
      const { data } = await customFetch.get("/jobs/showStats", {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      checkError(error, thunkAPI);
    }
  }
);
const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    hideLoading: (state) => {
      state.isLoading = false;
    },
    showLoading: (state) => {
      state.isLoading = true;
    },
    handleInput: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFilterState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAlljobState: () => {
      return initialState;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (
      state,
      { payload: { jobs, totalJobs, numOfPages } }
    ) => {
      state.isLoading = false;
      state.jobs = jobs;
      state.totalJobs = totalJobs;
      state.numOfPages = numOfPages;
    },
    [getAllJobs.pending]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [showStats.pending]: (state) => {
      state.isLoading = true;
    },
    [showStats.fulfilled]: (
      state,
      { payload: { defaultStats, monthlyApplications } }
    ) => {
      state.isLoading = false;
      state.stats = defaultStats;
      state.monthlyApplications = monthlyApplications;
    },
    [showStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const {
  hideLoading,
  showLoading,
  handleInput,
  clearFilters,
  changePage,
  clearAlljobState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
