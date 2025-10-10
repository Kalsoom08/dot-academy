'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api";

const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, remember }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token;

      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      const profileRes = await dispatch(fetchCurrentUser());
      return { token, user: profileRes.payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Login failed" });
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/register", data);
      const token = res.data.token;

      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      const profileRes = await dispatch(fetchCurrentUser());
      return { token, user: profileRes.payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Registration failed" });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/api/user/me");
      return res.data.user || null;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to fetch user" });
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.put("/api/user/profile", data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to update profile" });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/forgotPassword", { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to send reset link" });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/auth/resetPassword/${token}`, { password });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to reset password" });
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getToken(),
    status: "idle",
    error: null,
    forgotMessage: null,
    resetMessage: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') localStorage.removeItem("token");
      api.defaults.headers.Authorization = null;
      state.error = null;
      state.forgotMessage = null;
      state.resetMessage = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.forgotMessage = null;
      state.resetMessage = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.payload?.error || "Login failed";
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.payload?.error || "Registration failed";
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload?.error || "Failed to fetch user";
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to update profile";
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotMessage = action.payload;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to send reset link";
        state.forgotMessage = null;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetMessage = action.payload;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to reset password";
        state.resetMessage = null;
      });
  },
});

export const { logout, setUser, clearError, clearMessages } = authSlice.actions;
export default authSlice.reducer;
