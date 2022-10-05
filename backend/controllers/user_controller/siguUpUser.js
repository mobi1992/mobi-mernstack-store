const User = require('../../models/user')
const cloudinary = require('cloudinary')
exports.signUpUser = async (req, res, next) => {
    try {
        // console.log(req.body)
        // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder : 'avatars',
        //     width : 300,
        //     crop : 'scale'
        // })
        const today = new Date()
        const { firstName, lastName,  email, password } = req.body
        const user = await User.create({
            firstName, lastName, email, password,
            createdAt : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            // profile_pic: {
            //     public_id : myCloud.public_id,
            //     url : myCloud.secure_url
            // }
        })
        const token = await user.generateAuthToken()
        res.status(201).send({
            success: true,
            user,
            token
        })
    }
    catch (err) {
        next(err)
    }
}