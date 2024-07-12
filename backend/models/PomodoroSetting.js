import mongoose, { Schema } from 'mongoose';

const PomodoroSettingSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    focusTime: {
        type: Number,
        default: 1500,
    },
    shortBreakTime: {
        type: Number,
        default: 300,
    },
    longBreakTime: {
        type: Number,
        default: 900,
    },
    longBreakInterval: {
        type: Number,
        default: 4,
    },
});

const PomodoroSetting = mongoose.model(
    'PomodoroSetting',
    PomodoroSettingSchema
);
export default PomodoroSetting;
