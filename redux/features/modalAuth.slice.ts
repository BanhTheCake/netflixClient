import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ModalAuthState {
    isOpen: boolean;
}

const initialState: ModalAuthState = {
    isOpen: false,
};

export const ModalAuthSlice = createSlice({
    name: 'modalAuth',
    initialState,
    reducers: {
        setModalAuthState: (
            state,
            action: PayloadAction<Partial<ModalAuthState>>
        ) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setModalAuthState } = ModalAuthSlice.actions;
export default ModalAuthSlice.reducer;
