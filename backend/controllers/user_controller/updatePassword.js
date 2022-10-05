const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')

// Update user password
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const isPasswordMatch = await user.comparePassword(req.body.oldPassword)
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Old password is incorrect!', 400))
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler('Passwords do not match', 400))
        }
        user.password = req.body.newPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Password has been successfully updated.'
        })
    }
    catch (err) {
        next(err)
    }
}