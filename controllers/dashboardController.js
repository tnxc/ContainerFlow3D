module.exports = (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // ถ้ายังไม่ล็อกอินให้ไปที่หน้า Login
    }

    // ส่งข้อมูล userName ไปยังหน้า Dashboard
    res.render('dashboard', {
        userName: req.session.userName // ข้อมูลชื่อ-นามสกุล
    });
};