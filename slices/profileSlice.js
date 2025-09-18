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

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    courses: [],
    quizAttempts: [],
    unattemptedTests: [],
    docViews: [],
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
      });
  },
});

export default profileSlice.reducer;
