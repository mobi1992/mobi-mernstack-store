const Product = require('../../models/product')
const ErrorHander = require('../../utils/errorHandler')

// Create new review or update the rewiew
exports.createProductReviewUnknownUser = async (req, res, next) => {
    try {
        const {name, rating, comment, productId } = req.body
        const review = {
            user : '',
            name,
            rating: Number(rating),    // rating must be a number
            comment
        }
        const product = await Product.findById(productId)
        if (!product) {
            next(new ErrorHander('No product found', 404))
        }
        console.log(product)
            // push the review on the review array 
            product.reviews.push(review)
            console.log(product.reviews)
            // update the num of reviews as well
            product.numOfReviews = product.reviews.length

        // calculate the average of all the reviews
        let avg = 0
        product.reviews.forEach(rev => {
            avg+=rev.rating
        })
        product.ratings = avg / product.reviews.length;
        await product.save()
        res.status(201).send({
            success : true,
            message : 'Thanks for your review. Your review has been successfully added!'
        })
    }
    catch(err) {
        next(err)
    }
}