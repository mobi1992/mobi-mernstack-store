// get logged in user order
const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')
const ApiFeatures = require('../../utils/apiFeatures')

exports.myOrders = async(req,res,next) => {
    try {
        const resultPerPage = 20
        let ordersCount = await Order.find({user : req.user._id}).countDocuments()
        let apiFeatures = new ApiFeatures(Order.find({user : req.user._id}), req.query).pagination(resultPerPage)
        const orders = await apiFeatures.query
        if(!orders) {
            return next(new ErrorHandler('No order found with this id', 404))
        }
        res.status(200).send({
            success : true,
            orders,
            resultPerPage,
            ordersCount
        })
    }
    catch(err) {
        next(err)
    }
}