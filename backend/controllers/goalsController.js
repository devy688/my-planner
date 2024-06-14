import Goal from '../models/Goal.js';

const readGoals = async (req, res) => {
    const { userId } = req.body;

    try {
        const goals = await Goal.find({ userId });

        return res.json({
            message: 'Goal read successfully',
            goals,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('readGoals Server error');
    }
};

const registerGoal = async (req, res) => {
    const { userId, title, color } = req.body;

    if (!title || !color) {
        return res
            .status(400)
            .json({ message: 'Please include a title and color' });
    }

    try {
        const newGoal = new Goal({ userId, title, color });
        await newGoal.save();

        return res.json({
            message: 'Goal registerd successfully',
            newGoal,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('registerGoal Server error');
    }
};

const updateGoal = async (req, res) => {
    const { userId, id, title, color } = req.body;

    if (!title || !color) {
        return res
            .status(400)
            .json({ message: 'Please include a title and color' });
    }

    try {
        const updatedGoal = await Goal.findOneAndUpdate(
            { userId, _id: id }, // 조건
            { title, color }, // 업데이트할 데이터
            { new: true } // 업데이트 후의 문서를 반환
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        const updateSorted = await Goal.find({ userId }).sort({ _id: 1 });

        return res.json({
            message: 'Goal updated successfully',
            updatedGoal,
            updateSorted,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('updatedGoal Server error');
    }
};

const deleteGoal = async (req, res) => {
    const { userId, id } = req.body;

    try {
        const deletedGoal = await Goal.findOneAndDelete({ userId, _id: id });

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        res.json({
            message: 'Goal deleted successfully',
            deleted: id,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('deleteGoal Server error');
    }
};

export { readGoals, registerGoal, updateGoal, deleteGoal };
