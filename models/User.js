const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname : {
        type : String ,
        require : true
    },
    lastname : {
        type : String ,
        require : true
    },
    email : {
        type : String , 
        required : [true, 'Please Provide email'],
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    password : {
        type : String ,
        required : [true, 'Please Provide password']
    }

})

const User = mongoose.model('User' ,UserSchema)
module.exports = User