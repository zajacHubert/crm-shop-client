import { Auth } from '@/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

interface UserState {
  auth: Auth | null;
}

const initialState: UserState = {
  auth: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Auth | null>) {
      if (!getCookie('jwt')) {
        setCookie('jwt', action?.payload?.jwt);
      }
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
      deleteCookie('jwt');
    },
  },
});

export const { setAuth, logout } = userSlice.actions;
export default userSlice.reducer;
