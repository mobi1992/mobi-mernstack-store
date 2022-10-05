const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')
const cloudinary = require('cloudinary')
// Update product --- Admin 
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
        req.body.user = req.user.id
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
        // req.body.user = req.user.id     //save the user id in req.body.user
        if(req.body.image) {
            const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
                folder : 'products',
                // width : 300,
                crop : 'scale'
            })
            product = await Product.findById(req.params.id)
            const images = {
                public_id : myCloud.public_id,
                url : myCloud.secure_url
            }
            product.images = images
            await product.save()
        }
        if (req.body.catgs) {
            await product.setCategories(req.body.catgs)
        }
        if (req.body.relatedProducts) {
            await product.setRelatedProducts(req.body.relatedProducts)
        }
        res.status(200).send({
            success: true,
            product
        })
    }
    catch (err) {
        next(err)
    }
}