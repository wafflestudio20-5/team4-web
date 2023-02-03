import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiLogin, apiLogout, apiRefresh, apiGetMyInfo } from '../../lib/api';
import { LoginDto } from '../../lib/dto';
import { Session } from '../../lib/interface';

const initialState: Session = {
  user: undefined,
  accessToken: null,
};

export const postLogin = createAsyncThunk<Session, LoginDto>(
  'session/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const loginResponse = await apiLogin(username, password);
      const myInfoResponse = await apiGetMyInfo(loginResponse.data.accessToken);
      return {
        user: myInfoResponse.data.user,
        accessToken: loginResponse.data.accessToken,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const postLogout = createAsyncThunk<void, string>(
  'session/logout',
  async (token) => {
    await apiLogout(token);
  }
);

export const postRefresh = createAsyncThunk<Session>(
  'session/refresh',
  async () => {
    const refreshResponse = await apiRefresh();
    const myInfoResposne = await apiGetMyInfo(refreshResponse.data.accessToken);
    return {
      user: myInfoResposne.data.user,
      accessToken: refreshResponse.data.accessToken,
    };
  }
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(postLogout.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
    });
    builder.addCase(postRefresh.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    });
    builder.addCase(postRefresh.rejected, (state) => {
      state.user = null;
      state.accessToken = null;
    });
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
