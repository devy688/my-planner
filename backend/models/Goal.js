import mongoose, { Schema } from 'mongoose';

const GoalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    totalPomodoroTime: {
        type: Number,
        default: 0,
    },
});

const Goal = mongoose.model('Goal', GoalSchema);
export default Goal;
