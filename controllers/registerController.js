module.exports = (req ,res) => {

    let firstname = ""
    let lastname = ""
    let email = ""
    let password = ""
    let data = req.flash('data')[0]

    if (typeof data != "undefined") {
        email = data.email
        password = data.password
    }

    res.render('register.html',{
        errors: req.flash('validationErrors'),
        email: email,
        password: password
    })
}