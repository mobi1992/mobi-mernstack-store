// get All orders --- admin
const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')
const ApiFeatures = require('../../utils/apiFeatures')

exports.getAllOrders = async(req,res,next) => {
    try {
        const resultPerPage = 20
        let orders = await Order.find()
        const ordersCount = await Order.countDocuments()
        const today = new Date()
        const todayDate = today.toDateString()
        if(!orders) {
            return next(new ErrorHandler('No order found', 404))
        }
        orders.forEach(order => console.log(order.createdOrderAt.toDateString()))
        const today_orders = await Order.find({"createdOrderAt" : todayDate})
        let todayTotalAmount = 0
        today_orders.forEach(order => todayTotalAmount = todayTotalAmount + order.totalPrice)
        let totalAmount = 0
        orders.forEach(order => totalAmount = totalAmount + order.totalPrice)
        let apiFeatures = new ApiFeatures(Order.find(), req.query).pagination(resultPerPage)
        orders = await apiFeatures.query
        res.status(200).send({
            success : true,
            resultPerPage,
            ordersCount,
            totalAmount,
            todayTotalAmount,
            orders,
        })
    }
    catch(err) {
        next(err)
    }
}