const Category = require('../../models/category')
const ErrorHandler = require('../../utils/errorHandler')

exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return next(new ErrorHandler('Category not found', 404))
        }
        res.send({
            success : true,
            category
        })
    }
    catch(err) {
        next(err)
    }
}