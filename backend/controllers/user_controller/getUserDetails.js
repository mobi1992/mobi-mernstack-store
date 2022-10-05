const User = require('../../models/user')

// Get user details, after the user is logged in
exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        let isAdmin = false
        console.log(user.role)
        if(user.role === 'admin') {
            isAdmin = true
            console.log('isAdmin', isAdmin)
        }
        res.status(200).send({
            success: true,
            isAdmin,
            user
        })
    }
    catch (err) {
        next(err)
    }
}