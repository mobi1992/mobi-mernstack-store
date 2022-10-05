const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        })
    }
    catch (err) {
        next(err)
    }
}