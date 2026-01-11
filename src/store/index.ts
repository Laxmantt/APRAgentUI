import { configureStore } from '@reduxjs/toolkit';

// Import slices here (we'll add them later)
// import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        // user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
