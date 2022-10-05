// view any order --- admin route
const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')

exports.getSingleOrder = async(req,res,next) => {
    try {
        const order = await Order.findById(req.params.id)
        
          if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
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