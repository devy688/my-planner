import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedDate: new Date(),
};

export const selectedDateSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedDateForPomodoro: (state, action) => {
            state.selectedDate = action.payload;
        },
        clearSelectedDate: (state) => {
            state.selectedDate = null;
        },
    },
});

export const { setSelectedDateForPomodoro, clearSelectedDate } =
    selectedDateSlice.actions;

export default selectedDateSlice.reducer;
