import { createSlice } from '@reduxjs/toolkit';
import { Session } from '../lib/interface';

const initialState: Session = {
  user: {
    /* Initialized for test purposes */
    id: 0,
    username: 'user_test',
    nickname: 'LV.1 뉴비_8sd9c1cw',
    reviewCount: 10,
    registrationDate: '2017-07-21T19:50:28Z',
  },
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
