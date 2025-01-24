const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

//connection mongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.jzahb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error))

global.loggedIn = null

//controller
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const registerController = require('./controllers/registerController')
const aboutController = require('./controllers/aboutController')
const contactController = require('./controllers/contactController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const dashboardController = require('./controllers/dashboardController')
const reportController = require('./controllers/reportController')
const updateUserController = require('./controllers/updateUserController');

//middleware
const pathMiddleware = require('./middleware/pathMiddleware')
pathMiddleware(app)

const redirectifAuth = require('./middleware/redirectifAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(expressSession({
    secret: "node secret",
    resave: false,
    saveUninitialized: false
}))
app.use("*" , (req , res , next) => {
    loggedIn = req.session.userId
    next()
})

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', indexController)
app.get('/login', redirectifAuth , loginController)
app.get('/register', redirectifAuth , registerController)
app.get('/about', redirectifAuth , aboutController)
app.get('/contact', redirectifAuth , contactController)
app.post('/user/register', redirectifAuth , storeUserController)
app.post('/user/login' , redirectifAuth , loginUserController)
app.get('/logout', logoutController)
app.get('/dashboard' , authMiddleware ,dashboardController)
app.get('/report' , reportController)
app.put('/user/update', authMiddleware, updateUserController);

app.listen(10000, () =>{
    console.log("app listening on http://localhost:10000")
}) 