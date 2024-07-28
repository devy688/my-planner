import User from '../models/User.js';

const updateUser = async (req, res) => {
    const file = req.file;
    const { userId, nickname } = req.body;

    try {
        const updateData = { nickname: nickname };

        if (file) {
            const base64Image = file.buffer.toString('base64');
            const mimeType = file.mimeType;
            updateData.profileImage = `data:${mimeType};base64,${base64Image}`;
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            message: 'File uploaded and user updated successfully',
            updatedUser,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('updatedUser Server error');
    }
};

export { updateUser };
