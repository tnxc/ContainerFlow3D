const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const { email, password } = req.body 

    User.findOne({ email: email }).then((user) => {
        console.log(user)

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    req.session.userId = user._id
                    return res.redirect('/dashboard')
                } else {
                    res.redirect('/login')
                }
            })
        } else {
            res.redirect('/login')
        }
    })
}