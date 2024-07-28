import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {},
    loading: false,
    error: null,
};

export const updateUserAsync = createAsyncThunk(
    'user/updateUserAsync',
    async ({ formData }, thunkAPI) => {
        try {
            const response = await axios.post('/api/user/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data.updatedUser;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            // Update goal
            .addCase(updateUserAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(updateUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
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
