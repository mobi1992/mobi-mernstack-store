const Category = require('../../models/category')

exports.createCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).send({
            success: true,
            category
        })
    }
    catch (err) {
        next(err)
    }
}