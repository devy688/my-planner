import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    goals: [],
    loading: false,
    error: null,
};

export const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.post('/api/goals/read', { userId });
            console.log('fetchGoals success >>> ', response.data.message);

            return response.data.goals;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addGoalAsync = createAsyncThunk(
    'goals/addGoal',
    async ({ userId, title, color }, thunkAPI) => {
        try {
            const response = await axios.post('/api/goals/register', {
                userId,
                title,
                color,
            });
            console.log('addGoalAsync success >>> ', response.data.message);

            return response.data.newGoal;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateGoalAsync = createAsyncThunk(
    'goals/updateGoal',
    async ({ userId, id, title, color }, thunkAPI) => {
        try {
            const response = await axios.post('/api/goals/update', {
                userId,
                id,
                title,
                color,
            });
            console.log('updateGoalAsync success >>> ', response.data.message);

            return response.data.updatedGoal;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteGoalAsync = createAsyncThunk(
    'goals/deleteGoal',
    async ({ userId, id }, thunkAPI) => {
        try {
            const response = await axios.post('/api/goals/delete', {
                userId,
                id,
            });
            console.log('deleteGoalAsync success >>> ', response.data.message);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
        clearGoals: (state) => {
            state.goals = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch goals
            .addCase(fetchGoals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.loading = false;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Add goal
            .addCase(addGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addGoalAsync.fulfilled, (state, action) => {
                state.goals.push(action.payload);
                state.loading = false;
            })
            .addCase(addGoalAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // Update goal
            .addCase(updateGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateGoalAsync.fulfilled, (state, action) => {
                const index = state.goals.findIndex(
                    (goal) => goal._id === action.payload._id
                );
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateGoalAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete goal
            .addCase(deleteGoalAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteGoalAsync.fulfilled, (state, action) => {
                state.goals = state.goals.filter(
                    (goal) => goal._id !== action.payload
                );
                state.loading = false;
            })
            .addCase(deleteGoalAsync.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setGoals, clearGoals } = goalsSlice.actions;

export default goalsSlice.reducer;
