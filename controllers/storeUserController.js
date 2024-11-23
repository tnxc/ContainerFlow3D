const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        // ตรวจสอบว่า Email ซ้ำในฐานข้อมูลหรือไม่
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // หากพบ Email ซ้ำ
            req.flash('validationErrors', ['This email is already registered.']);
            req.flash('data', req.body);
            return res.redirect('/register');
        }

        // หาก Email ไม่ซ้ำ ให้สร้างผู้ใช้ใหม่
        await User.create(req.body);
        console.log('User registered successfully!');
        res.redirect('/');
    } catch (error) {
        console.error(error);

        // ตรวจสอบว่ามี validation errors หรือไม่
        if (error && error.errors) {
            const validationErrors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
        } else {
            // สำหรับ error ประเภทอื่น
            req.flash('validationErrors', ['An unexpected error occurred.']);
        }

        return res.redirect('/register');
    }
}
