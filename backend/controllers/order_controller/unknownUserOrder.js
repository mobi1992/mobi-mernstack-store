// get unknown user order based on userAgent and order id
const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')

exports.unknownUserSingleOrder = async(req,res,next) => {
    const userAgent = req.headers['user-agent']
    // const userAgent = 'Android jsgksj'
    try {
        let order = await Order.findOne({_id : req.params.id})
        
          if (!order) {

            return next(new ErrorHandler("Order not found with this Id", 404));
          }
        
          order = await Order.findOne({userAgent, _id : req.params.id})
          if(!order) {
            return next(new ErrorHandler("Enter your email and orderNo", 400))
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