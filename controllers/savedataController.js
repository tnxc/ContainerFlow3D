const Box = require('../models/Box');

module.exports = async (req, res) => {
    try {
        const saveDataList = req.body;

        if (!Array.isArray(saveDataList) || saveDataList.length === 0) {
            return res.status(400).json({ success: false, message: 'No data received' });
        }
        
        const nameInputs = saveDataList.map(data => data.nameInput);
        const uniqueNameInputs = [...new Set(nameInputs)];
        if (uniqueNameInputs.length > 1) {
            return res.status(400).json({ success: false, message: 'Multiple nameInput values are not allowed in one request' });
        }

        const nameInput = uniqueNameInputs[0];
        // ตรวจสอบว่ามี nameInput อยู่ในฐานข้อมูลแล้วหรือไม่
        const isNameExists = await Box.exists({ nameInput, userId: req.user.id });

        if (isNameExists) {
            return res.status(400).json({ 
                success: false, 
                message: `ชื่อ '${nameInput}' ถูกใช้ไปแล้ว กรุณาใช้ชื่ออื่น` 
            });
        }

        // เพิ่ม userId ลงในแต่ละรายการก่อนบันทึก
        const saveDataWithUserId = saveDataList.map(data => ({
            ...data,
            userId: req.user.id  
        }));

        // บันทึกข้อมูลทั้งหมดในฐานข้อมูล
        await Box.insertMany(saveDataWithUserId);

        res.status(201).json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
