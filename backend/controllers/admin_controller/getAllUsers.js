// get All users --- admin
const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')
const ApiFeatures = require('../../utils/apiFeatures')

exports.getAllUsers = async(req,res,next) => {
    try {
        const resultPerPage = 20
        let users = await User.find()
        const usersCount = await User.countDocuments()
        if(!users) {
            return next(new ErrorHandler('No user found!', 404))
        }
        
        let apiFeatures = new ApiFeatures(User.find(), req.query).pagination(resultPerPage)
        users = await apiFeatures.query
        res.status(200).send({
            success : true,
            resultPerPage,
            usersCount,
            users,
        })
    }
    catch(err) {
        next(err)
    }
}