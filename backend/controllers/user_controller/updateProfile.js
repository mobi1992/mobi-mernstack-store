const User = require('../../models/user')

exports.updateProfile = async (req, res, next) => {
    try {
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        // leave cloudinary for now  
        const user = await User.findByIdAndUpdate(req.user.id, userData, { new: true, runValidators: true, useFindAndModify: false })
        res.status(200).send({
            sucess: true,
            user
        })
    }
    catch (err) {
        next(err)
    }
}
