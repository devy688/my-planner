import List from '../models/List.js';

const readLists = async (req, res) => {
    const { userId, goals, date } = req.body;

    try {
        const lists = await List.find({ userId });

        const clientDate = new Date(date);
        const clientTime = new Date(
            clientDate.getFullYear(),
            clientDate.getMonth(),
            clientDate.getDate()
        ).getTime();

        const goalsWithLists = [];
        for (let i = 0; i < goals.length; i++) {
            let temp = {
                userId: userId,
                id: goals[i]._id,
                title: goals[i].title,
                lists: [],
                color: goals[i].color,
                totalPomodoroTime: goals[i].totalPomodoroTime,
            };

            for (let j = 0; j < lists.length; j++) {
                // Ensure lists[j].date is a valid date string
                if (lists[j].date) {
                    const listDate = new Date(lists[j].date);

                    if (!isNaN(listDate.getTime())) {
                        let comparisonDate = new Date(
                            listDate.getFullYear(),
                            listDate.getMonth(),
                            listDate.getDate()
                        ).getTime();

                        if (
                            clientTime === comparisonDate &&
                            goals[i]._id === lists[j].goalId.toString()
                        ) {
                            temp.lists.push({
                                id: lists[j]._id,
                                goalId: lists[j].goalId,
                                name: lists[j].name,
                                isCompleted: lists[j].isCompleted,
                                date: lists[j].date,
                                pomodoroSessions: lists[j].pomodoroSessions,
                            });
                        }
                    } else {
                        console.warn('Invalid date format:', lists[j].date);
                    }
                } else {
                    console.warn('Missing date field in list:', lists[j]);
                }
            }
            goalsWithLists.push(temp);
        }

        return res.json({
            message: 'List read successfully',
            lists,
            goalsWithLists,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readLists Server error');
    }
};

const readMonthLists = async (req, res) => {
    const { userId, goals, year, month } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    try {
        const monthLists = await List.find({
            userId,
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        }).lean();

        const lists = [...monthLists];
        for (let i = 0; i < goals.length; i++) {
            const goalIdStr = goals[i]._id.toString();

            for (let j = 0; j < lists.length; j++) {
                if (goals[i]._id === lists[j].goalId.toString()) {
                    lists[j].color = goals[i].color;

                    const clientDate = new Date(lists[j].date);
                    lists[j].day = clientDate.getDate();
                }
            }
        }

        return res.json({
            message: 'List Month read successfully',
            lists,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readMonthLists Server error');
    }
};

const registerList = async (req, res) => {
    const { userId, goalId, name, date } = req.body;

    try {
        const newList = new List({ userId, goalId, name, date });
        await newList.save();

        return res.json({
            message: 'List registerd successfully',
            newList,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('registerList Server error');
    }
};

const updateList = async (req, res) => {
    const { userId, goalId, listId, name } = req.body;

    try {
        const updatedList = await List.findOneAndUpdate(
            { userId, goalId, _id: listId }, // 조건
            { name }, // 업데이트할 데이터
            { new: true } // 업데이트 후의 문서를 반환
        );

        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }

        return res.json({
            message: 'list updated successfully',
            updatedList,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('updatedList Server error');
    }
};

const updateListCompletion = async (req, res) => {
    const { userId, goalId, listId, isCompleted } = req.body;

    try {
        const updatedListCompletion = await List.findOneAndUpdate(
            { userId, goalId, _id: listId }, // 조건
            { isCompleted: !isCompleted }, // 업데이트할 데이터
            { new: true } // 업데이트 후의 문서를 반환
        );

        if (!updatedListCompletion) {
            return res.status(404).json({ message: 'List not found' });
        }

        return res.json({
            message: 'list completion updated successfully',
            updatedListCompletion,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('updatedListCompletion Server error');
    }
};

const deleteList = async (req, res) => {
    const { userId, goalId, listId } = req.body;

    try {
        const deletedList = await List.findOneAndDelete({
            userId,
            goalId,
            _id: listId,
        });

        if (!deletedList) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.json({
            message: 'List deleted successfully',
            deleted: listId,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('deleteList Server error');
    }
};

export {
    readLists,
    readMonthLists,
    registerList,
    updateList,
    updateListCompletion,
    deleteList,
};
