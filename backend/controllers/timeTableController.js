import Pomodoro from '../models/Pomodoro.js';
import Goal from '../models/Goal.js';

const readTotalTimeSummary = async (req, res) => {
    const { userId, goals, date } = req.body;
    const goalsForTotalTimeSummary = [...goals];
    const selectedDate = new Date(date);

    try {
        const pomodoros = await Pomodoro.find({ userId });

        for (let i = 0; i < goalsForTotalTimeSummary.length; i++) {
            goalsForTotalTimeSummary[i].date = selectedDate;

            for (let j = 0; j < pomodoros.length; j++) {
                const isSameYear =
                    selectedDate.getFullYear() ===
                    pomodoros[j].date.getFullYear();
                const isSameMonth =
                    selectedDate.getMonth() === pomodoros[j].date.getMonth();
                const isSameDay =
                    selectedDate.getDate() === pomodoros[j].date.getDate();
                const isSameDate = isSameYear && isSameMonth && isSameDay;

                if (
                    goalsForTotalTimeSummary[i]._id ===
                        pomodoros[j].goalId.toString() &&
                    isSameDate
                ) {
                    let timeDifference =
                        pomodoros[j].endTime.getTime() -
                        pomodoros[j].startTime.getTime();
                    let secondDifference = timeDifference / 1000;

                    goalsForTotalTimeSummary[i].totalPomodoroTime +=
                        secondDifference;
                }
            }
        }

        return res.json({
            message: 'totalTimeSummary read successfully',
            goalsForTotalTimeSummary,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readTotalTimeSummary Server error');
    }
};

const readTimeTable = async (req, res) => {
    const { userId, date } = req.body;
    const selectedDate = new Date(date);

    const conditionGte = selectedDate.setHours(5, 0, 0, 0);
    const conditionLt = new Date(selectedDate);
    conditionLt.setDate(conditionLt.getDate() + 1);
    conditionLt.setHours(5, 0, 0, 0);

    try {
        const pomodoros = await Pomodoro.find({
            userId,
            startTime: {
                $gte: conditionGte,
                $lt: conditionLt,
            },
            endTime: {
                $gte: conditionGte,
                $lt: conditionLt,
            },
        }).lean();

        const goals = await Goal.find({
            userId,
        });

        const pomodoroWithGoalColor = [...pomodoros];
        for (let i = 0; i < goals.length; i++) {
            for (let j = 0; j < pomodoroWithGoalColor.length; j++) {
                if (
                    goals[i]._id.toString() ===
                    pomodoroWithGoalColor[j].goalId.toString()
                ) {
                    pomodoroWithGoalColor[j].color = goals[i].color;
                }
            }
        }

        return res.json({
            message: 'readTimeTable read successfully',
            pomodoroWithGoalColor,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readTimeTable Server error');
    }
};

export { readTotalTimeSummary, readTimeTable };
