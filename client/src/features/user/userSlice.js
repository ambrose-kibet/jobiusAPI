import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
  customFetch,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../utils";
import { clearAlljobState } from "../jobs/alljobsSlice";
import { clearValues } from "../jobs/jobSlice";
const initialState = {
  isLoading: false,
  info: "",
  isVerified: false,
  isregistered: false,
  user: getLocalStorage("user"),
  isSidebarOpen: true,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const items = await customFetch.post("/auth/register", user);

      return items.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const verifyUser = createAsyncThunk(
  "user/verifyuser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/verify", user);
      return resp.data.msg;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await customFetch.post("/auth/login", user, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/upDateUser",
  async (user, thunkAPI) => {
    try {
      const { data } = await customFetch.patch("/users/update-user", user, {
        withCredentials: true,
      });

      return data.user;
    } catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("Unauthorized logging out ...");
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const resp = await customFetch.delete("/auth/logout", {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});
export const clearStore = createAsyncThunk(
  "user/clearStore",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(logout());
      thunkAPI.dispatch(clearAlljobState());
      thunkAPI.dispatch(clearValues());
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.info = payload.msg;
      state.isregistered = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [verifyUser.pending]: (state) => {
      state.isLoading = true;
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.info = payload;
      state.isVerified = true;
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      setLocalStorage("user", payload);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [logout.pending]: (state) => {
      state.isLoading = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.isLoading = false;

      state.user = null;
      removeLocalStorage("user");
    },
    [logout.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.user = null;
      toast.error(payload);
    },
    [updateUser.pending]: (state) => {
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload;
      setLocalStorage("user", payload);
      toast.success("updated successfully");
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { toggleSidebar } = userSlice.actions;
export default userSlice.reducer;
