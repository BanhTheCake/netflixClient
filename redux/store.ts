import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth.slice';
import themeReducer from './features/theme.slice';
import modalAuthReducer from './features/modalAuth.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        modalAuth: modalAuthReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
