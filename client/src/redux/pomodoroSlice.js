import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    pomodoro: null,
    loading: false,
    error: null,
};

export const addPomodoroAsync = createAsyncThunk(
    'goals/addGoal',
    async ({ userId }, thunkAPI) => {
        try {
            const response = await axios.post('/api/pomodoro/register', {
                userId,
            });
            console.log('addPomodoroAsync success >>> ', response.data.message);

            return response.data.newPomodoro;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
