const Order = require('../../models/order')
const ErrorHandler = require('../../utils/errorHandler')
const Cart = require('../../models/cart')
const {sendOrderConfirmationMailUnkUsr} = require('../../utils/sendEmail')
exports.newOrderUnknownUser = async(req,res,next) => {
    try {
        const {shippingInfo, paymentInfo, shippingPrice} = req.body
        console.log(req.headers.origin)
        console.log(req.headers['user-agent'])
        const userAgent = req.headers['user-agent']
            const cart = req.session.cart
            if(!cart){
                return next(new ErrorHandler('Cart not found!', 404))
            }
            if (cart.cartItems.length === 0) {
                return next(new ErrorHandler('Cart is empty', 400))
            }
            const today = new Date()
            const order = await Order.create({
                shippingInfo,
                cart : {
                    orderItems : cart.cartItems,
                    totalQty : cart.totalQuantity,
                    totalCost : cart.totalPrice
                },
                paymentInfo,
                shippingPrice,
                userAgent,
                totalPrice : cart.totalPrice + shippingPrice,
                placedAt : today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
            })
        
        await order.generateOrderNo()
        await sendOrderConfirmationMailUnkUsr(order)
        res.status(201).send({
            success : true,
            order
        })
    }
    catch(err) {
        next(err)
    }
}