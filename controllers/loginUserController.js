const User = require('../models/User');

module.exports = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {
        console.log(user);

        if (user) {
            if (password === user.password) {
                req.session.userId = user._id;
                return res.redirect('/dashboard');
            } else {
                res.redirect('/login');
            }
        } else {
            res.redirect('/login');
        }
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal Server Error');
    });
};
