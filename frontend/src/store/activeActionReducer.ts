import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ActiveActionState {
    id: string | undefined;
}

const initialState: ActiveActionState = {
    id: undefined
};

const activeActionSlice = createSlice({
    name: 'activeAction',
    initialState,
    reducers: {
        toggleAction: (state, action: PayloadAction<ActiveActionState>) => {
            state.id = action.payload.id;
        },
    },
});

export const { toggleAction } = activeActionSlice.actions;
export default activeActionSlice.reducer;
