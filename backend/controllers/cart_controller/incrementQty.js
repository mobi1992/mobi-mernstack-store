const Cart = require('../../models/cart')
const ErrorHandler = require('../../utils/errorHandler')

exports.incrementQty = async (req, res, next) => {
    try {
        const { product } = req.body
        let cart = await Cart.findOne({ user: req.user._id })
        if (!cart) {
            return next(new ErrorHandler('Cart not found!', 404))
        }
        
        // if the product already exists in the cart, update its quantity by 1
        const itemIndex = cart.cartItems.findIndex(prod => prod.product.toString() === product)
        if(itemIndex <= -1) {
            return next(new ErrorHandler('Item not found', 404))
        }
        else {
            let item = cart.cartItems[itemIndex]
            item.quantity = item.quantity + 1
            cart.cartItems[itemIndex] = item
        }
        await cart.calcTotalQtyAndPrice()
        await cart.save()
        res.status(200).send({
            success: true,
            cart
        })
    }
    catch (err) {
        next(err)
    }
}

