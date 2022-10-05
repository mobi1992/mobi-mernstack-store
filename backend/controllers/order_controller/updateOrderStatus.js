const Order = require('../../models/order')
const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return next(new ErrorHandler("Order not found with this Id", 404));
        }

        if (order.orderStatus === "Delivered") {
            return next(new ErrorHandler("You have already delivered this order", 400));
        }

        const today = new Date()
        // if (req.body.status === "Shipped") {
        //     order.cart.orderItems.forEach(async (o) => {
        //         await updateStock(o.product, o.quantity);
        //     });
        // }
        order.orderStatus = req.body.status;

        if (req.body.status === "Delivered") {
            order.deliveredAt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
        }
        await order.save({validateBeforeSave : false})
        res.status(200).send({
            success: true,
            message: 'Order status has been successfully updated!',
            order
        })
    }

    catch (err) {
        next(err)
    }
}

// async function updateStock(id, quantity) {
//     const product = await Product.findById(id)
//     product.stock = product.stock - quantity
//     await product.save({validateBeforeSave : false})
// }