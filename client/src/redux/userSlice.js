import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    loading: false,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        clearUser: (state) => {
            state.userInfo = null;
        },
        fetchUserStart: (state) => {
            state.loading = true;
        },
        fetchUserSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.loading = false;
        },
        fetchUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setUser,
    clearUser,
    fetchUserStart,
    fetchUserSuccess,
    fetchUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
