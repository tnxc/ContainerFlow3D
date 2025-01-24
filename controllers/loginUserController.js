const User = require('../models/User'); // เรียกใช้งาน Model ของ User

module.exports = (req, res) => {
    const { email, password } = req.body; // รับค่า email และ password จากฟอร์ม

    // ค้นหาผู้ใช้ที่มีอีเมลตรงกับที่กรอก
    User.findOne({ email: email })
        .then((user) => {
            console.log(user); // ตรวจสอบผลลัพธ์เพื่อดูข้อมูลผู้ใช้

            if (user) {
                // ตรวจสอบรหัสผ่าน
                if (password === user.password) {
                    // หากล็อกอินสำเร็จ จัดเก็บข้อมูลที่จำเป็นใน session
                    req.session.userId = user._id;  // เก็บ userId ใน session
                    req.session.userName = `${user.firstname} ${user.lastname}`; // เก็บชื่อเต็มใน session

                    // รีไดเร็กต์ไปยังหน้า Dashboard
                    res.redirect('/dashboard');
                } else {
                    // หากรหัสผ่านไม่ตรง ให้กลับไปที่หน้า Login พร้อมข้อความแจ้งเตือน
                    req.flash('error', 'Incorrect password. Please try again.');
                    res.redirect('/login');
                }
            } else {
                // หากไม่พบผู้ใช้ ให้กลับไปที่หน้า Login พร้อมข้อความแจ้งเตือน
                req.flash('error', 'User not found. Please check your email.');
                res.redirect('/login');
            }
        })
        .catch((error) => {
            console.error(error); // แสดงข้อผิดพลาด
            res.status(500).send('Internal Server Error');
        });
};
