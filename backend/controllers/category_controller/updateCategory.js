const Category = require('../../models/category')
const ErrorHandler = require('../../utils/errorHandler')

exports.updateCategory = async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name']
        const isValidOperation = updates.every(update => allowedUpdates.includes(update))
        if(!isValidOperation){
            return next(new ErrorHandler('Invalid update!'))
        }
        const _id = req.params.id
        const category = await Category.findOne({ _id, new: true, runValidators: true })
        if (!category){
            return next(new ErrorHandler('Category not found', 404))
        }
        updates.forEach(update => category[update] = req.body[update])
        await category.save()
        res.send({
            success : true,
            category
        })
    }
    catch(err){
        next(err)
    }
}