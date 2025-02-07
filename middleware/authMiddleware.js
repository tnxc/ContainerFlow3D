const User = require('../models/User')

module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');  
    }
    User.findById(req.session.userId)
        .then(user => {
            if (!user) {
                return res.redirect('/login');  
            }
            req.user = user;  
            next(); 
        })
        .catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        });
};
