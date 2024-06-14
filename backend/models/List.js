import mongoose, { Schema } from 'mongoose';

const PomodoroSessionSchema = new Schema({
    startTime: {
        type: Date,
        default: null,
    },
    endTime: {
        type: Date,
        default: null,
    },
});

const ListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    goalId: {
        type: Schema.Types.ObjectId,
        ref: 'Goal',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    pomodoroTime: {
        type: Number,
        default: 0,
    },
    pomodoroSessions: [PomodoroSessionSchema],
    date: {
        type: Date,
        default: Date.now,
    },
});

const List = mongoose.model('List', ListSchema);
export default List;
