import mongoose, { Schema } from 'mongoose';

const TimeTableSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    sessionType: {
        type: String,
        enum: ['focus', 'shortBreak', 'longBreak'],
        required: true,
    },
    goalId: {
        type: Schema.Types.ObjectId,
        ref: 'Goal',
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pomodoroId: {
        type: Schema.Types.ObjectId,
        ref: 'Pomodoro',
        required: true,
    },
});

const TimeTable = mongoose.model('TimeTable', TimeTableSchema);
export default TimeTable;
