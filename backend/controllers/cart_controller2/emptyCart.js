const Cart2 = require('../../models/cart2')
const ErrorHandler = require('../../utils/errorHandler')

exports.emptyCart = async(req, res, next) => {
    try {
        const { product } = req.body
        const cart = new Cart2(req.session.cart)
        if (!req.session.cart) {
            return next(new ErrorHandler('Cart not found!', 404))
        }
        cart.cartItems = []
        await cart.calcTotalQtyAndPrice()
        req.session.cart = cart
        res.status(200).send({
            success : true,
            message : 'Your cart is empty now!',
            cart
        })
    }
    catch(err) {
        next(err)
    }
}