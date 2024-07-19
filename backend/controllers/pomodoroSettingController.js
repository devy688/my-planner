import PomodoroSetting from '../models/PomodoroSetting.js';

const readPomodoroSetting = async (req, res) => {
    const { userId } = req.body;

    try {
        let pomodoroSetting = await PomodoroSetting.find({ userId });

        if (pomodoroSetting.length === 0) {
            pomodoroSetting = new PomodoroSetting({
                userId,
            });
            await pomodoroSetting.save();
        }

        res.json({
            message: 'PomodoroSetting read successfully',
            pomodoroSetting,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readPomodoroSetting Server error');
    }
};

const updatePomodoroSetting = async (req, res) => {
    const { userId, timer } = req.body;

    let converted = {
        focusTime: Number(timer.focusTime) * 60,
        shortBreakTime: Number(timer.shortBreakTime) * 60,
        longBreakTime: Number(timer.longBreakTime) * 60,
        longBreakInterval: timer.longBreakInterval,
    };

    try {
        const updatedPomodoroSetting = await PomodoroSetting.findOneAndUpdate(
            { userId },
            {
                focusTime: converted.focusTime,
                shortBreakTime: converted.shortBreakTime,
                longBreakTime: converted.longBreakTime,
                longBreakInterval: converted.longBreakInterval,
            },
            { new: true }
        );

        if (!updatedPomodoroSetting) {
            return res
                .status(404)
                .json({ message: 'PomodoroSetting not found' });
        }

        return res.json({
            message: 'PomodoroSetting updated successfully',
            updatedPomodoroSetting,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('updatePomodoroSetting Server error');
    }
};

export { readPomodoroSetting, updatePomodoroSetting };
