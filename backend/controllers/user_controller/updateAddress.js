const User = require('../../models/user')

exports.updateAddress = async (req, res, next) => {
    try {
        const userData = {
            country : req.body.country,
            province : req.body.province,
            city : req.body.city,
            address : req.body.address,
            postalCode : req.body.postalCode,
            phoneNo : req.body.phoneNo
        }
        // leave cloudinary for now  
        const user = await User.findById(req.user.id)
        user.country = userData.country
        user.province = userData.province
        user.city = userData.city
        user.address = userData.address
        user.postalCode = userData.postalCode
        user.phoneNo = userData.phoneNo
        await user.save()
        res.status(200).send({
            success: true,
            user
        })
    }
    catch (err) {
        next(err)
    }
}
