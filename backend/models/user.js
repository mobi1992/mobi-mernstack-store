const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
// const { validate } = require('./category')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ErrorHander = require('../utils/errorHandler')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        minlength: [4, 'Name shoudl have more than 4 characters'],
        trim: true
    },

    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        maxlength: [30, 'Name cannot exceed 30 characters'],
        minlength: [4, 'Name shoudl have more than 4 characters'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'Email already in use'],
        validate: [validator.isEmail, 'Please enter a valid email '],
        trim: true
    },

    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [8, 'Password must be greater than 8 characters'],
        trim: true
        // select : false
    },
    country : {
        type : String,
        trim : true
    },

    address : {
        type : String,
        trim : true
    },

    city : {
        type : String,
        trim : true
    },

    province : {
        type : String,
        trim : true
    },

    postalCode : {
        type : String,
        trim : true
    },

    phoneNo : {
        type : String,
        trim : true
    },
    // profile_pic: {
    //     public_id: {
    //         type: String,
    //         required: true
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },

    role: {
        type: String,
        default: 'user',
        trim: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],

    createdAt: {
        type: String,
        required : true,
      },

    resetPasswordToken: String,
    resetPasswordExpire: String
})

// statics is on user model, this binding is not important here so we can use an arrow function
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })   //email : email 
    if (!user) {
        throw new ErrorHander('Email is incorrect!', 401)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    // console.log(isMatch)
    if (!isMatch) {
        throw new ErrorHander('Password is incorrect!', 401)
    }
    // return the user if email and password matches
    return user
}

userSchema.methods.comparePassword = async function (oldPassword) {
    return await bcrypt.compare(oldPassword, this.password);
};
// the methods are on user instances, so this binding is important here, that is why we will use a standard function here
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
    // save the user to add the token in the tokens array, we will use the concat method to add a new token in the tokens array

    user.tokens = user.tokens.concat({ token })     // object with token property equla to token  token:token, so we will use the shorthand syntax
    await user.save()
    return token
}

// create resetPasswordToken
userSchema.methods.getResetPasswordToken = async function () {
    const user = this
    const resetToken = crypto.randomBytes(20).toString('hex')
    // hasing and adding resetPassword to userSchema, we will use sha256 value to create hash adn aplly other mehtods
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    // the token should expire in 15 to 20 minutes, it is enough
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000   // converting in miliseconds 
    return resetToken
}
// Hiding private data, like tokens array and password, toJSON method will be called no matter we call it explicity or not
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject     // this userObject will be sent to the client, which does not contain password or tokens array
}

//Hash the plan text password before saving
// now we can apply middleware to the schema, middleware has 2 methods, one is pre (that means do something before saving a user) and the other is post (that means do something after saving the user), we will use pre and the method we will use is save
userSchema.pre('save', async function (next) {   // you cannot use arrow fucntion here as this binding plays impt role here
    // this here gives access to the individual user that is about to be saved 
    const user = this

    // if the password is created for the first time in post req or is being modified in patch req
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)   // hashed password is overwriting the plain rext password of the user
    }
    console.log('Just before saving')
    // we simply call next when we are done
    next()
})
const User = mongoose.model('User', userSchema)
module.exports = User