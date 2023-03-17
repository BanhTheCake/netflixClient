import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
    token: string;
    user: {
        userId: string;
        username: string;
        displayName: string;
    } | null;
}

const initialState: AuthState = {
    token: '',
    user: null,
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<Partial<AuthState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setAuthState } = AuthSlice.actions;
export default AuthSlice.reducer;
