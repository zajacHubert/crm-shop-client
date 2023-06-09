import {
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
  dispatch(setSuccess(isSuccess));
  dispatch(setMessage(message));
  dispatch(openSnackBar());
};
