const Cart = require('../../models/cart')
const ErrorHandler = require('../../utils/errorHandler')

exports.getCartItems = async (req, res, next) => {
    try {
        let cart = req.session.cart
        if (!cart) {
            return next(new ErrorHandler('Your cart is currently empty!', 400))
        }
        if(cart.cartItems.length === 0){
            return res.status(200).send({
                success : true,
                cart,
                message : 'Your cart is empty now!'
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