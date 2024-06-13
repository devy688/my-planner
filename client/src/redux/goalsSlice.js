import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    goals: [],
    loading: false,
    error: null,
};

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setGoals: (state, action) => {
            state.goals = action.payload;
        },
        addGoal: (state, action) => {
            state.goals.push(action.payload);
        },
        updateGoal: (state, action) => {
            const index = state.goals.findIndex(
                (goal) => goal.id === action.payload.id
            );
            if (index !== -1) {
                state.goals[index] = action.payload;
            }
        },
        deleteGoal: (state, action) => {
            state.goals = state.goals.filter(
                (goal) => goal.id !== action.payload
            );
        },
        clearGoals: (state) => {
            state.goals = [];
        },
        fetchGoalsStart: (state) => {
            state.loading = true;
        },
        fetchGoalsSuccess: (state, action) => {
            state.goals = action.payload;
            state.loading = false;
        },
        fetchGoalsFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    setGoals,
    addGoal,
    updateGoal,
    deleteGoal,
    clearGoals,
    fetchGoalsStart,
    fetchGoalsSuccess,
    fetchGoalsFailure,
} = goalsSlice.actions;

export default goalsSlice.reducer;
