const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')

// delete a user --- admin route
exports.deleteUser = async(req,res,next) => {
    try { 
        const user = await User.findById(req.params.id)
        if(!user) {
            return next(new ErrorHandler(`User does not exist with the id : ${req.params.id}`, 404))
        }
        await user.remove()
        res.status(200).send({
            success : true,
            message : 'User has been successfully removed'
        })
    }
    catch(err) {
        next(err)
    }
}