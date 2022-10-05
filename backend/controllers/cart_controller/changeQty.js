const Cart = require('../../models/cart')
const ErrorHandler = require('../../utils/errorHandler')

exports.changeQty = async (req, res, next) => {
    try {
        const { product, quantity } = req.body
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
            item.quantity = quantity
            cart.cartItems[itemIndex] = item

            if (item.quantity === 0) {
                await cart.removeFromTheCart(product)
                await cart.calcTotalQtyAndPrice()
                await cart.save()
                return res.status(200).send({
                    success: true,
                    message : 'Item has been successfully removed from the cart!',
                    cart
                })
            }
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

