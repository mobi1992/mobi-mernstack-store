const Cart = require('../../models/cart')
const ErrorHandler = require('../../utils/errorHandler')

exports.getCartItems = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            return next(new ErrorHandler('No cart found!', 404))
        }
        if(cart.cartItems.length === 0){
            return res.status(200).send({
                success : true,
                message : 'Your cart is empty now!',
                cart
            })
        }
        res.status(200).send({
            success : true,
            cart
        })
    }
    catch(err){
        next(err)
    }
}