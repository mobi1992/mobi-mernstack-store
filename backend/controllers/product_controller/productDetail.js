const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')

// Get single product detail
exports.productDetail = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('related_products.product', "name price ratings numOfReviews images")
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
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