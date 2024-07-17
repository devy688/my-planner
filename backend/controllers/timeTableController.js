import Pomodoro from '../models/Pomodoro.js';

const readTotalTimeSummary = async (req, res) => {
    const { userId, goals, date } = req.body;
    const goalsForTotalTimeSummary = [...goals];
    const selectedDate = new Date(date);

    try {
        const pomodoros = await Pomodoro.find({ userId });

        if (!pomodoros) {
            res.json({
                message: 'Dose not exist pomodoros',
            });
        }

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

export { readTotalTimeSummary };
