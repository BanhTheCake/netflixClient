import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
    mode: 'dark' | 'light';
}

const initialState: ThemeState = {
    mode: 'dark',
};

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeState: (state, action: PayloadAction<Partial<ThemeState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setThemeState } = ThemeSlice.actions;
export default ThemeSlice.reducer;
