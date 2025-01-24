const User = require('../models/User'); // เรียกใช้โมเดล User

module.exports = async (req, res) => {
    try {
        const { firstname, lastname, password } = req.body; 
        const userId = req.session.userId; // ใช้ session เพื่อระบุ user ที่กำลังแก้ไข

        if (!userId) {
            return res.status(401).send('Unauthorized access');
        }

        // อัปเดตข้อมูลใน MongoDB
        const user = await User.findByIdAndUpdate(
            userId,
            { firstname, lastname, password },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating user' });
    }
};
