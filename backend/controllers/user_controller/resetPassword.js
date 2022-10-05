const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')
const crypto = require('crypto')

// reset password
exports.resetPassword = async (req, res, next) => {
    try {
        console.log(req.body)
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest("hex")
        const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })    // check if the date now is greater than expire time of the token

        if (!user) {
            return next(new ErrorHandler('Reset password token is invalid or has been expired', 400))
        }

        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler('Passwords do not match', 400))
        }

        user.password = req.body.password

        // After changing user password clear resetPasswordToken and resetPasswordExpire fields by setting them to undefined
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()

        res.status(200).send({
            success: true,
            message: 'Password has be successfully changed.'
        })
    }
    catch (err) {
        next(err)
    }
}