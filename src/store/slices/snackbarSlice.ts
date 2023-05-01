import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
  isOpen: boolean;
  message: string | null;
  success: boolean;
}

const initialState: SnackbarState = {
  isOpen: false,
  message: null,
  success: false,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackBar(state) {
      state.isOpen = true;
    },
    closeSnackbar(state) {
      state.isOpen = false;
    },
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    setSuccess(state, action: PayloadAction<boolean>) {
      state.success = action.payload;
    },
  },
});

export const { openSnackBar, closeSnackbar, setMessage, setSuccess } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
