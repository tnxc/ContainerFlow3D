const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            req.flash('validationErrors', ['This email is already registered.']);
            req.flash('data', req.body);
            return res.redirect('/register');
        }
        await User.create(req.body);
        console.log('User registered successfully!');
        res.redirect('/');
    } catch (error) {
        if (error && error.errors) {
            const validationErrors = Object.keys(error.errors).map(
                (key) => error.errors[key].message
            );
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
        } else {
            req.flash('validationErrors', ['An unexpected error occurred.']);
        }
        return res.redirect('/register');
    }
}
