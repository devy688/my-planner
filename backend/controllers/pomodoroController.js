import Pomodoro from '../models/Pomodoro.js';

const registerPomodoro = async (req, res) => {
    const { pomodoroSettingId, date, userId, taskId, startTime, endTime } =
        req.body;

    try {
        const newPomodoro = new Pomodoro({
            pomodoroSettingId,
            date,
            userId,
            taskId,
            sessionType: 'focus',
            startTime,
            endTime,
        });
        await newPomodoro.save();

        return res.json({
            message: 'Pomodoro registerd successfully',
            newPomodoro,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('registerPomodoro Server error');
    }
};

export { registerPomodoro };
