const User = require('../../models/user')
const ErrorHandler = require('../../utils/errorHandler')

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorHandler('Please enter email and password', 400))
        }
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            token
        })
    }
    catch (err) {
        next(err)
    }
}
