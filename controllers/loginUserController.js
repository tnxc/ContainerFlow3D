const User = require('../models/User'); 
module.exports = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then((user) => {
            if (user) {

                if (password === user.password) {
                    req.session.userId = user._id; 
                    req.session.userName = `${user.firstname} ${user.lastname}`;
                    res.redirect('/dashboard');
                } else {
                    req.flash('error', 'Incorrect password. Please try again.');
                    res.redirect('/login');
                }
            } else {
                req.flash('error', 'User not found. Please check your email.');
                res.redirect('/login');
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
};
