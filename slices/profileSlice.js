import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api"; 

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/api/user/profile/${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchProfileActivity = createAsyncThunk(
  "profile/fetchProfileActivity",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/api/user/profile/activity?userId=${userId}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "profile/fetchLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/api/user/profiles/leaderboard`);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    courses: [],
    quizAttempts: [],
    unattemptedTests: [],
    docViews: [],

    attemptedTests: [],
    watchedVideos: [],
    docsViewed: [],
    askedQuestions: [],
    doubts: [],

    topUsers: [],
    leaderboard: [],

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses || [];
        state.quizAttempts = action.payload.quizAttempts || [];
        state.unattemptedTests = action.payload.unattemptedTests || [];
        state.docViews = action.payload.docViews || [];
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile data";
      })

      .addCase(fetchProfileActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.attemptedTests = action.payload.attemptedTests || [];
        state.watchedVideos = action.payload.watchedVideos || [];
        state.docsViewed = action.payload.docsViewed || [];
        state.askedQuestions = action.payload.askedQuestions || [];
        state.doubts = action.payload.doubts || [];
      })
      .addCase(fetchProfileActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch activity data";
      })

      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.topUsers = action.payload.topUsers || [];
        state.leaderboard = action.payload.leaderboard || [];
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leaderboard data";
      });
  },
});

export default profileSlice.reducer;
