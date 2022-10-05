const Cart = require('../../models/cart')
const ErrorHandler = require('../../utils/errorHandler')

exports.emptyCart = async(req, res, next) => {
    try {
        const { product } = req.body
        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            return next(new ErrorHandler('Cart not found!', 404))
        }
        cart.cartItems = []
        await cart.calcTotalQtyAndPrice()
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