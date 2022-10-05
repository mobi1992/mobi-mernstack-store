const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')
const {sendOrderConfirmationMail} = require('../../utils/sendEmail')
exports.mySingleOrder = async(req,res,next) => {
  console.log(req.user._id)
    try {
        const order = await Order.findOne({user : req.user._id, _id : req.params.id})
        
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