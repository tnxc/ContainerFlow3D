const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    email : {
        type : String , 
        required : [true, 'Please Provide email']
    },
    password : {
        type : String ,
        required : [true, 'Please Provide password']
    }

})

UserSchema.pre('save' , function(next){
    const user = this 

    bcrypt.hash(user.password , 10).then(hash => {
        user.password = hash
        next()
    }).catch(Error =>{
        console.error(error)
    })
})

const User = mongoose.model('User' ,UserSchema)
module.exports = User