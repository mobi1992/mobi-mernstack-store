const NewsLetter = require('../../models/newsLetter')

exports.createNewsLetter = async (req, res, next) => {
    try {
        const newsLetter = await NewsLetter.create(req.body)
        res.status(201).send({
            success: true,
            newsLetter
        })
    }
    catch (err) {
        next(err)
    }
}