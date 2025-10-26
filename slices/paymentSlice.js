import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../APIs/api';

// Async thunks
export const submitPayment = createAsyncThunk(
  'payment/submitPayment',
  async ({ courseId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/user/api/courses/${courseId}/payment`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCoursePaymentInfo = createAsyncThunk(
  'payment/getCoursePaymentInfo',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/api/courses/${courseId}/payment-info`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getMyPayments = createAsyncThunk(
  'payment/getMyPayments',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 10, status } = params;
      const response = await api.get('/user/api/me/payments', {
        params: { page, limit, status }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPaymentDetails = createAsyncThunk(
  'payment/getPaymentDetails',
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/api/payments/${paymentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Initial state
const initialState = {
  paymentInfo: null,
  myPayments: [],
  currentPayment: null,
  loading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  }
};

// Slice
const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPaymentInfo: (state) => {
      state.paymentInfo = null;
    },
    clearCurrentPayment: (state) => {
      state.currentPayment = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit payment
      .addCase(submitPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get course payment info
      .addCase(getCoursePaymentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursePaymentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentInfo = action.payload.data;
      })
      .addCase(getCoursePaymentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get my payments
      .addCase(getMyPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.myPayments = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get payment details
      .addCase(getPaymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPaymentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload.data;
      })
      .addCase(getPaymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError, clearPaymentInfo, clearCurrentPayment } = paymentSlice.actions;
export default paymentSlice.reducer;