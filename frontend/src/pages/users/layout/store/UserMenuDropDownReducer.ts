import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserMenuDropDownState {
  isOpen: boolean;
}

const initialState: UserMenuDropDownState = {
  isOpen: false
};

const UserMenuDropDownSlice = createSlice({
  name: 'userMenuDropDown',
  initialState,
  reducers: {
    toggleDropDown: (state, action: PayloadAction<UserMenuDropDownState>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { toggleDropDown } = UserMenuDropDownSlice.actions;
export default UserMenuDropDownSlice.reducer;
