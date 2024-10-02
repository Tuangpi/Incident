import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectProjectState {
    id: string | undefined;
}

const initialState: selectProjectState = {
    id: undefined
};

const selectProjectSlice = createSlice({
    name: 'selectProject',
    initialState,
    reducers: {
        setSelectProject: (state, action: PayloadAction<selectProjectState>) => {
            state.id = action.payload.id;
        },
    },
});

export const { setSelectProject } = selectProjectSlice.actions;
export default selectProjectSlice.reducer;
