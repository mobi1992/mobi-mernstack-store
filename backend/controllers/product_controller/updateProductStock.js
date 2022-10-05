const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')
// Update product --- Admin 
exports.updateProductStock = async (req, res, next) => {
    try {
        const {quantity} = req.body
        let product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
        if (quantity > product.stock) {
            return next(new ErrorHandler('Quantity is greater than product Stock'))
        }
        product.stock = product.stock - quantity
        await product.save()
        res.status(200).send({
            success: true,
            product
        })
    }
    catch (err) {
        next(err)
    }
}