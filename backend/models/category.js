const mongoose = require('mongoose')
const validator = require('validator')
const Product = require('./product')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter the name of the category'],
        unique : [true, 'Name of the category should be unique']
    }
})

const Category = mongoose.model('Category' ,categorySchema)
module.exports = Category