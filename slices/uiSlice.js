import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoginModalOpen: false,
    redirectPath: null,
  },
  reducers: {
    openLoginModal: (state, action) => {
      state.isLoginModalOpen = true;
      state.redirectPath = action.payload || null;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
      state.redirectPath = null;
    },
  },
});

export const { openLoginModal, closeLoginModal } = uiSlice.actions;
export default uiSlice.reducer;
