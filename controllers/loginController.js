module.exports = (req, res) => {
    const messages = req.flash(); // ดึงข้อความแจ้งเตือนทั้งหมดจาก req.flash
    res.render('login.html', { messages }); // ส่งข้อความแจ้งเตือนไปยัง View
};
