'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api";

const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/register", data);
      if (res.data.token && typeof window !== 'undefined') localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Registration failed" });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/login", data);
      if (res.data.token && typeof window !== 'undefined') localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Login failed" });
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/otp/email/send", { email });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Failed to send OTP" });
    }
  }
);

export const verifyEmailOtp = createAsyncThunk(
  "auth/verifyEmailOtp",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/auth/otp/email/verify", { email, code });
      if (res.data.token && typeof window !== 'undefined') localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "OTP verification failed" });
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

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/forgotPassword', { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to send reset link');
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/api/auth/resetPassword/${token}`, { password });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || 'Failed to reset password');
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
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user || null;
        state.token = action.payload.token || null;
      })
      .addCase(verifyEmailOtp.fulfilled, (state, action) => {
        state.token = action.payload.token || state.token;
        state.user = action.payload.user || state.user;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
