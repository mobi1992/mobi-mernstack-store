const Category = require('../../models/category')

exports.getCategories = async (req, res, next) => {
    try {
        const categoryCount = await Category.countDocuments()
        const categories = await Category.find({})
        res.status(200).send({
            success: true,
            categories,
            categoryCount
        })
    }
    catch (err) {
        next(err)
    }
}