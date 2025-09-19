// slices/courseSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../APIs/api'; // Your axios instance

// Async thunks
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (params = {}, { rejectWithValue }) => {
    try {
      const {
        search,
        priceType,
        tag,
        sort = "newest",
        page = 1,
        limit = 12
      } = params;
      
      const response = await api.get('user/api/courses', {
        params: { search, priceType, tag, sort, page, limit }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCourseDetails = createAsyncThunk(
  'courses/fetchCourseDetails',
  async (courseId, { rejectWithValue }) => {
    try {
      // Ensure this endpoint returns course + lessons (or sections->lessons).
      // If your backend uses a different shape, the UI adapter in CourseDetail handles both shapes.
      const response = await api.get(`/user/api/courses/${courseId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCourseSummary = createAsyncThunk(
  'courses/fetchCourseSummary',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/u/courses/${courseId}/summary`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const enrollInCourse = createAsyncThunk(
  'courses/enrollInCourse',
  async ({ courseId, paymentData = {} }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/u/courses/${courseId}/enroll`, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMyEnrollments = createAsyncThunk(
  'courses/fetchMyEnrollments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/u/me/enrollments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchLessonContent = createAsyncThunk(
  'courses/fetchLessonContent',
  async ({ courseId, lessonId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/api/courses/${courseId}/lessons/${lessonId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateLessonProgress = createAsyncThunk(
  'courses/updateLessonProgress',
  async ({ courseId, lessonId, progressData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/u/courses/${courseId}/lessons/${lessonId}/progress`,
        progressData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const submitQuizAttempt = createAsyncThunk(
  'courses/submitQuizAttempt',
  async ({ courseId, lessonId, answers }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/u/courses/${courseId}/lessons/${lessonId}/quiz/attempt`,
        { answers }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  courses: [],
  currentCourse: null,
  courseSummary: null,
  enrollments: [],
  currentLesson: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  },
  filters: {
    search: '',
    priceType: '',
    tag: '',
    sort: 'newest'
  }
};

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
      state.courseSummary = null;
    },
    clearCurrentLesson: (state) => {
      state.currentLesson = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetCourses: (state) => {
      state.courses = [];
      state.pagination = initialState.pagination;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch course details
      .addCase(fetchCourseDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentCourse = null; // avoid flashing old data when navigating between details
      })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload.data;
      })
      .addCase(fetchCourseDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch course summary
      .addCase(fetchCourseSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.courseSummary = action.payload.data;
      })
      .addCase(fetchCourseSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Enroll in course
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        // Add to enrollments if not already there
        const exists = state.enrollments.some(
          e => e.course._id === action.payload.data.course
        );
        if (!exists) {
          state.enrollments.push(action.payload.data);
        }
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch my enrollments
      .addCase(fetchMyEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.data;
      })
      .addCase(fetchMyEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch lesson content
      .addCase(fetchLessonContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonContent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLesson = action.payload.data;
      })
      .addCase(fetchLessonContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update lesson progress
      .addCase(updateLessonProgress.fulfilled, () => {})
      
      // Submit quiz attempt
      .addCase(submitQuizAttempt.fulfilled, () => {});
  }
});

export const {
  clearError,
  clearCurrentCourse,
  clearCurrentLesson,
  setFilters,
  resetCourses
} = courseSlice.actions;

export default courseSlice.reducer;
