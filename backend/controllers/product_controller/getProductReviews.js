const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')

exports.getProductReviews = async(req,res,next) => {
    try {
        const product = await Product.findById(req.query.productId)
        if (!product) {
            return next(new ErrorHandler('Product not found!', 404))
        }
        res.status(200).send({
            success : true,
            reviews : product.reviews
        })
    }
    catch(err) {
        next(err)
    }
}