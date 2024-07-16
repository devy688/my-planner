import mongoose, { Schema } from 'mongoose';

const PomodoroSchema = new mongoose.Schema({
    pomodoroSettingId: {
        type: Schema.Types.ObjectId,
        ref: 'PomodoroSetting',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    taskId: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: true,
    },
    sessionType: {
        type: String,
        enum: ['focus', 'shortBreak', 'longBreak'],
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
    },
    // previousSession: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Pomodoro',
    //     default: null,
    // },
});

const Pomodoro = mongoose.model('Pomodoro', PomodoroSchema);
export default Pomodoro;
