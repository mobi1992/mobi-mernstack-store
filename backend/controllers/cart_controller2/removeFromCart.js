const Cart2 = require('../../models/cart2')
const ErrorHandler = require('../../utils/errorHandler')

exports.removeFromCart = async(req, res, next) => {
    try {
        const { product } = req.body
        const cart = new Cart2(req.session.cart)
        if (!req.session.cart) {
            return next(new ErrorHandler('Cart not found!', 404))
        }
        const index = cart.cartItems.findIndex(prod => prod.product.toString() === product)
        if (index <= -1) {
            return next(new ErrorHandler('Item not found', 404))
        } 
        await cart.removeFromTheCart(product)
        await cart.calcTotalQtyAndPrice()
        req.session.cart = cart
        res.status(200).send({
            success : true,
            message : 'Item has been successfully removed from the cart!',
            cart
        })
    }
    catch(err) {
        next(err)
    }
}