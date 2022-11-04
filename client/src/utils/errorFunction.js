import { clearStore } from "../features/user/userSlice";
export const checkError = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorzed! logging out..");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
