import {
  closeSnackbar,
  openSnackBar,
  setMessage,
  setSuccess,
} from '@/store/slices/snackbarSlice';
import { Dispatch } from '@reduxjs/toolkit';

export const displaySnackBar = (
  dispatch: Dispatch,
  isSuccess: boolean,
  message: string
) => {
  //   dispatch(closeSnackbar());
  dispatch(setSuccess(isSuccess));
  dispatch(setMessage(message));
  dispatch(openSnackBar());
};
