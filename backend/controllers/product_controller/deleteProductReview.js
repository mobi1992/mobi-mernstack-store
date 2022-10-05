const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')

exports.deleteProductReview = async(req,res,next) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler('Product not found!', 404))
        }
        // filter the reviews you want to keep
        const reviews = await product.deleteReview(req.body.reviewId)
        // rating will be changed when any review gets deleted
        let avg = 0
        reviews.forEach(rev => avg += rev.rating)
        console.log(product.reviews)
        console.log(reviews)
        console.log(reviews.length)
        let ratings = 0
        if(reviews.length === 0) {
            ratings = 0
        }
        else {
            ratings = avg / reviews.length
        }
        console.log(ratings)
        const numOfReviews = reviews.length
        await Product.findByIdAndUpdate(req.params.id, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new : true,
            runValidators : true,
            useFindAndModify : false
        })
        res.status(200).send({
            success : true,
            message : 'Review has be successfully deleted!'
        })
    }
    catch(err) {
        next(err)
    }
}