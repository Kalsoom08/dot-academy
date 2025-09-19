import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../APIs/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/api/notifications");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchNotificationById = createAsyncThunk(
  "notifications/fetchNotificationById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/user/api/notifications/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],           
    loadingList: false,  
    loadingDetail: false,
    error: null,
    isModalOpen: false,
    unreadCount: 0,    
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;

      if (state.isModalOpen) {
        state.items.forEach((n) => {
          n.read = true;
        });
        state.unreadCount = 0;
      }
    },
    markAsRead: (state, action) => {
      const notif = state.items.find((n) => n._id === action.payload);
      if (notif && !notif.read) {
        notif.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loadingList = false;
        state.items = action.payload || [];
        state.unreadCount = state.items.filter((n) => !n.read).length; 
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loadingList = false;
        state.error = action.payload || "Failed to fetch notifications";
      })

      .addCase(fetchNotificationById.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(fetchNotificationById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        const existing = state.items.find((n) => n._id === action.payload._id);
        if (existing) {
          Object.assign(existing, action.payload);
        } else {
          state.items.push(action.payload);
        }

        if (!action.payload.read) {
          const notif = state.items.find((n) => n._id === action.payload._id);
          if (notif) notif.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(fetchNotificationById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload || "Failed to fetch notification";
      });
  },
});

export const { toggleModal, markAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
