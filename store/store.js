import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import notificationReducer from '../slices/notificationSlice';
import courseReducer from '../slices/courseSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    notifications: notificationReducer,
    courses: courseReducer, 
  },
});
