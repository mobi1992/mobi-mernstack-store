const Category = require('../../models/category')
const ErrorHandler = require('../../utils/errorHandler')
const Product = require('../../models/product')

// delete the category
exports.deleteCategory = async (req, res, next) => {
    try {
        const catg = await Category.findByIdAndDelete(req.params.id)
        if (!catg) {
            return next(new ErrorHandler('Category not found', 404))
        }
        // delete the category_id from the product's prod_categories array, when the specific category is deleted
        const products = await Product.updateMany({ $pull: { prod_categories: { category: catg._id } } })

        // or delete all the products which have that category, you can take any approach
        // const products = await Product.deleteMany({"prod_categories.category" : catg._id})
        res.send({
            success: true,
            message: 'Category deleted successfully'
        })
    }
    catch (err) {
        next(err)
    }
}