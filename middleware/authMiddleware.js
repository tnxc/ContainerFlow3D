const User = require('../models/User')

module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');  // ถ้าไม่มี userId ใน session ให้ไปหน้า login
    }

    // ดึงข้อมูลผู้ใช้จากฐานข้อมูลตาม userId ใน session
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.redirect('/login');  // ถ้าไม่พบผู้ใช้ในฐานข้อมูล ให้ออกจากระบบ
            }

            req.user = user;  // กำหนด req.user เป็นข้อมูลของผู้ใช้
            next();  // ไปยัง controller ถัดไป
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        });
};
