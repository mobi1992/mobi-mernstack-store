const mongoose = require('mongoose')
const validator = require('validator')

const newsLetterSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, 'Please enter the email'],
        unique : [true, 'Email must be unique']
    }
})

const NewsLetter = mongoose.model('NewsLetter' ,newsLetterSchema)
module.exports = NewsLetter