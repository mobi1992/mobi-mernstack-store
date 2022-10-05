const Product = require('../../models/product')
const cloudinary = require('cloudinary')
// Create a product ---  Admin
exports.createProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder : 'products',
            // width : 300,
            crop : 'scale'
        })
        req.body.user = req.user.id     //save the user id in req.body.user
        const {name, price, description, ingredients, stock, user} = req.body
        const product = await Product.create({
            name, price, description, ingredients, stock,
            images: {
                public_id : myCloud.public_id,
                url : myCloud.secure_url
            },
            user
        })
        if (req.body.catgs){
        await product.setCategories(req.body.catgs)
        }
        if(req.body.relatedProducts){
        await product.setRelatedProducts(req.body.relatedProducts)
        }
        res.status(201).send({
            success: true,
            product
        })
    }
    catch (err) {
        console.log(err.message)
        next(err)
    }
}