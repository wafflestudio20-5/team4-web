import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  styleId?: number;
  locationKey?: string;
}

const initialState: ModalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<number>) => {
      state.open = true;
      state.styleId = action.payload;
      state.locationKey = undefined;
    },
    setClose: (state) => {
      state.open = false;
      state.styleId = undefined;
    },
    setSuspend: (state, action: PayloadAction<string>) => {
      state.open = false;
      state.locationKey = action.payload;
    },
  },
});

export const { setOpen, setClose, setSuspend } = modalSlice.actions;
export default modalSlice;
