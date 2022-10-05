const NewsLetter = require('../../models/NewsLetter')

exports.getCategories = async (req, res, next) => {
    try {
        const NewsLetterCount = await NewsLetter.countDocuments()
        const categories = await NewsLetter.find({})
        res.status(200).send({
            success: true,
            categories,
            NewsLetterCount
        })
    }
    catch (err) {
        next(err)
    }
}