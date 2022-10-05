// get unknown user order based on email and order number
const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')

exports.unknownUserSingleOrder2 = async(req,res,next) => {
    const userAgent = req.headers['user-agent']
    const {orderNo, email} = req.body
    try {
        const order = await Order.findOne({orderNo, 'shippingInfo.email' : email, _id : req.params.id})
        
          if (!order) {

            return next(new ErrorHandler("Order not found with this order number, email or order id", 404));
          }
        
          res.status(200).json({
            success: true,
            order,
          });
    }
    catch(err) {
        next(err)
    }
}