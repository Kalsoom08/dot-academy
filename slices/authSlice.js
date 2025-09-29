'use client';

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api";

// Helper to get token from localStorage
const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null);

// ------------------- THUNKS -------------------

// Login user and fetch full profile
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      // Login request
      const res = await api.post("/api/auth/login", data);
      const token = res.data.token;

      if (token && typeof window !== "undefined") {
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
      }

      // Fetch full user profile immediately
      const profileRes = await dispatch(fetchCurrentUser());
      return { token, user: profileRes.payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Login failed" });
    }
  }
);

// Register user and fetch full profile
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

      // Fetch full user profile after registration
      const profileRes = await dispatch(fetchCurrentUser());
      return { token, user: profileRes.payload };
    } catch (err) {
      return rejectWithValue(err.response?.data || { error: "Registration failed" });
    }
  }
);

// Fetch current user profile
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

// Update profile
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

// ------------------- SLICE -------------------

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
      api.defaults.headers.Authorization = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
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

      // Register
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

      // Fetch profile
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload?.error || "Failed to fetch user";
      })

      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload?.error || "Failed to update profile";
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
