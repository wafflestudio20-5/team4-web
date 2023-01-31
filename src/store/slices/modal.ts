import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  styleId?: number;
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
    },
    setClose: (state) => {
      state.open = false;
      state.styleId = undefined;
    },
  },
});

export const { setOpen, setClose } = modalSlice.actions;
export default modalSlice;
