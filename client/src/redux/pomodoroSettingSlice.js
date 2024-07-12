import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pomodoroSetting: null,
    loading: false,
    error: null,
};

export const fetchPomodoroSetting = createAsyncThunk(
    'pomodoroSetting/fetchPomodoroSetting',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post('/api/pomodoro-setting/read', {
                userId,
            });
            console.log(
                'fetchPomodoroSetting success >>> ',
                response.data.message
            );

            return response.data.pomodoroSetting;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updatePomodoroSettingAsync = createAsyncThunk(
    'pomodoroSetting/updatePomodoroSettingAsync',
    async ({ userId, timer }, thunkAPI) => {
        try {
            const response = await axios.post('/api/pomodoro-setting/update', {
                userId,
                timer,
            });
            console.log(
                'updatePomodoroSettingAsync success >>> ',
                response.data.message
            );

            return response.data.updatedPomodoroSetting;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setPomodoroSetting: (state, action) => {
            state.pomodoroSetting = action.payload;
        },
        clearPomodoroSetting: (state) => {
            state.pomodoroSetting = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch pomodoroSetting
            .addCase(fetchPomodoroSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPomodoroSetting.fulfilled, (state, action) => {
                state.pomodoroSetting = action.payload;
                state.loading = false;
            })
            .addCase(fetchPomodoroSetting.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Update pomodoroSetting
            .addCase(updatePomodoroSettingAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePomodoroSettingAsync.fulfilled, (state, action) => {
                const index = state.pomodoroSetting.findIndex(
                    (setting) => setting._id === action.payload._id
                );
                if (index !== -1) {
                    state.pomodoroSetting[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updatePomodoroSettingAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPomodoroSetting, clearPomodoroSetting } = goalsSlice.actions;

export default goalsSlice.reducer;
