const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')

// get any user detail --- admin route
exports.getSingleUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(new ErrorHandler(`User does not exist with the id : ${req.params.id}`, 404))
        }
        res.status(200).send({
            success : true,
            user
        })
    }
    catch(err) {
        next(err)
    }
}