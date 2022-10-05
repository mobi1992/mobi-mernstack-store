const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')
const {sendPasswordRecoveryMail} = require('../../utils/sendEmail')

// forgot password
exports.forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
        console.log(user)
    try {
        if (!user) {
            return next(new ErrorHandler('User not found', 404))
        }
        // get resetPassword token
        const resetToken = await user.getResetPasswordToken()
        await user.save()    // save the user resetPasswordToken as well

        // creating url to send user the email
        
        const resetPasswordUrl = `${req.protocol}://${req.get(
            "host"
        )}/password/reset/${resetToken}`
        const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore this.`

        // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
        // const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore this.`

        await sendPasswordRecoveryMail(user.email, message)

        res.status(200).send({
            success: true,
            message: `Email send to ${user.email} successfully.`
        })
    }
    catch (err) {
        // if an error occurs because of any reason, set resetPasswordToken and resetPasswordExpire to undefined (in other words to clear these fields) and save these values in user
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        next(err)
    }
}