import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HamburgerState {
  isOpen: boolean;
}

const initialState: HamburgerState = {
  isOpen: false
};

const hamburgerSlice = createSlice({
  name: 'hamburger',
  initialState,
  reducers: {
    toggleHamburger: (state, action: PayloadAction<HamburgerState>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { toggleHamburger } = hamburgerSlice.actions;
export default hamburgerSlice.reducer;
