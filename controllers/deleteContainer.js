const Box = require('../models/Box'); // นำเข้าโมเดล Box

module.exports = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const { nameInput } = req.body; // รับค่า nameInput ที่ต้องการลบ
        const userId = req.session.userId; // ใช้ userId จาก session

        // ลบข้อมูลทั้งหมดที่มี nameInput ตรงกัน และเป็นของ user นั้น
        const result = await Box.deleteMany({ nameInput, userId });

        if (result.deletedCount > 0) {
            res.json({ success: true, message: 'Deleted successfully' });
        } else {
            res.status(404).json({ error: 'No matching containers found' });
        }
    } catch (error) {
        console.error('Error deleting container:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
