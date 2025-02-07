module.exports = (req, res) => {
    const messages = req.flash();
    res.render('login.html', { messages }); 
};
