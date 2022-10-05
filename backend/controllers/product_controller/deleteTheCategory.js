const Product = require('../../models/product')

exports.deleteTheCategory = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
        req.body.user = req.user.id
        await product.deleteCategory(req.body.catgId)
        res.status(200).send({
            success : true,
            message : 'Category has been successfully deleted!'
        })
    }
    catch (err) {
        next(err)
    }
}