const Category = require('../../models/category')
const ApiFeatures = require('../../utils/apiFeatures')
const ErrorHandler = require('../../utils/errorHandler')
const Product = require('../../models/product')

exports.getCategoryProducts = async (req, res, next) => {
    try {
        const name = req.params.name
        const catg = await Category.findOne({name})
        const productsCount = await Product.countDocuments({ "prod_categories.category": catg._id })
        if (!catg) {
            return next(new ErrorHandler('Category not found', 404))
        }
        const resultPerPage = 20
        // const productCount = await Product.countDocuments()
        // query for search
        let apiFeatures = new ApiFeatures(Product.find({ "prod_categories.category": catg._id }), req.query).search().filter()   // calling the class search method
        // const products = await Product.find()
        apiFeatures.sort().pagination(resultPerPage)
        let products = await apiFeatures.query
        res.status(200).send({
            success: true,
            products,
            resultPerPage,
            productsCount
        })
    }
    catch (err) {
        next(err)
    }
}
