import { createSlice } from '@reduxjs/toolkit';
import { Session } from '../lib/interface';

const initialState: Session = {
  user: null,
  accessToken: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export default sessionSlice;
export const { login, logout } = sessionSlice.actions;
