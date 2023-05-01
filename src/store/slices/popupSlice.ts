import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  id: string | null;
}

const initialState: PopupState = {
  isOpen: false,
  id: null,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(state) {
      state.isOpen = true;
    },
    closePopup(state) {
      state.isOpen = false;
    },
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const { openPopup, closePopup, setId } = popupSlice.actions;
export default popupSlice.reducer;
