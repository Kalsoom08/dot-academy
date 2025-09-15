import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      if (res.data.error) {
        // backend might send 200 with error (defensive check)
        return rejectWithValue(res.data);
      }
      return res.data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Login failed" });
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  if (action.payload?.user && action.payload?.token) {
    state.user = action.payload.user;
    state.token = action.payload.token;
    localStorage.setItem("token", action.payload.token);
  } else {
    state.error = action.payload?.error || "Login failed";
  }
})

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Login failed";
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
