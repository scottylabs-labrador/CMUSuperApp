import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isModalOpen: boolean;
}

const initialState: UIState = {
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsModalOpen(state, action) {
        // eslint-disable-next-line
        state.isModalOpen = action.payload;
    },
  },
});

export const {
    setIsModalOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
