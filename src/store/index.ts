import { configureStore } from '@reduxjs/toolkit';
import sessionSlice from './slices/session';
import modalSlice from './slices/modal';

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
