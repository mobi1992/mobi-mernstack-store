const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ErrorHander = require('../utils/errorHandler')

exports.auth = async (req, res, next) => {
    // try {
    //     // get the token from request header
    //     const _token = req.header('Authorization')  // we have to trim Bearer from the token, we can use trim methods on string as well but here we are using replace method, and replacing Bearer with an empty string
    //     // console.log(token)
    //     if (!_token) {
    //         return new ErrorHander('Please login to access this resource!')
    //     }
    //     const token = _token.replace('Bearer ', '')
    //     const { _id } = jwt.verify(token, process.env.JWT_SECRET)   //verfiy the token with the same key you hav provided in the user model
    //     // console.log(decoded)       // the output will be something like that { _id: '6237d9ee50dc3ece69f25fab', iat: 1647827438 }

    //     // check the tokens array if the token is still present in the array, if you are saving the tokens in the database
    //     const user = await User.findOne({ _id, 'tokens.token': token })
    //     // console.log('User is', user)
    //     if (!user) {
    //         return new ErrorHander('Please authenticate')   // to trigger catch block
    //     }

    //     req.user = user     // add a property onto req to store user data
    //     req.token = token     // add a property onto req to store user token
    //     // return req.user, req.token
    //     next()
    // } catch (err) {
    //     res.status(401).json(err);
    //     res.end();
    // }

    try {
        // get the token from request header
        const _token = req.header('Authorization')  // we have to trim Bearer from the token, we can use trim methods on string as well but here we are using replace method, and replacing Bearer with an empty string
        console.log('token is.............', _token)
        if(!_token) {
            return next(new ErrorHander('Please login to access this resource!', 401))
        }
        const token = _token.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)   //verfiy the token with the same key you hav provided in the user model
        // console.log(decoded)       // the output will be something like that { _id: '6237d9ee50dc3ece69f25fab', iat: 1647827438 }

       // check the tokens array if the token is still present in the array, if you are saving the tokens in the database
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token})
        // console.log('User is', user)
        if (!user) {
            return next(new ErrorHander('Please authenticate', 401))   // to trigger catch block
        }

        req.user = user     // add a property onto req to store user data
        req.token = token     // add a property onto req to store user token
        // return req.user, req.token
        next()
    }
    
    catch(err) {
        next(err)
    }
}


exports.authorizedRole = (role) => {
    return (req, res, next) => {
        console.log(role)
        console.log(req.user.role)
        if (role !== req.user.role) {
            return next(new ErrorHander(`Role ${req.user.role} is not allowed to access this resourse`, 403))
        }
        next()
    }
}
