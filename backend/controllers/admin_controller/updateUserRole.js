const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')

// update user role --- admin route
exports.updateUserRole = async(req,res,next) => {
    try {
        const userRole = {
            role : req.body.role
        }
        const user = await User.findByIdAndUpdate(req.params.id, userRole, { new: true, runValidators: true, useFindAndModify: false })
        console.log(user)
        if(!user) {
            return next(new ErrorHandler(`User does not exist with the id : ${req.params.id}`, 404))
        }
        res.status(200).send({
            success : true,
            message : 'User role has been successfully updated!',
            user
        })
    }
    catch(err) {
        next(err)
    }
}