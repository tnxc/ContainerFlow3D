const Box = require('../models/Box'); // นำเข้าโมเดล Box

module.exports = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // ถ้ายังไม่ได้ล็อกอินให้ไปที่หน้า Login
    }

    try {
        const userId = req.session.userId; // ใช้ userId จาก session

        // ดึงข้อมูลทั้งหมดใน Box ที่ตรงกับ userId
        const boxes = await Box.find({ userId }); // ค้นหาจาก userId ที่เชื่อมโยงกับ Box

        console.log('All Boxes:', boxes); // แสดงผลลัพธ์ทั้งหมดใน console

        // กรองชื่อ container ที่ไม่ซ้ำ โดยไม่ลบข้อมูลอื่น
        const uniqueContainers = boxes.reduce((acc, current) => {
            // ตรวจสอบว่า namecontainer ยังไม่เคยมีใน acc หรือไม่
            if (!acc.some(item => item.nameInput === current.nameInput)) {
                acc.push(current); // ถ้ายังไม่เคยมีให้เพิ่มเข้าไป
            }
            return acc;
        }, []);

        console.log('Unique Containers:', uniqueContainers); // แสดงชื่อที่ไม่ซ้ำกันใน console

        // ส่งข้อมูลที่กรองแล้วไปยัง EJS
        res.render('dashboard.ejs', {
            userName: req.session.userName, // ชื่อผู้ใช้
            userId: req.session.userId,
            uniqueContainers, // ส่งชื่อ container ที่ไม่ซ้ำ
        });

    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        res.status(500).send("Internal Server Error");
    }
};
