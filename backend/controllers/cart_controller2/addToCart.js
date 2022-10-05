const Cart2 = require('../../models/cart2')
const Product = require('../../models/product')
const ErrorHandler = require('../../utils/errorHandler')
const ApiFeatures = require('../../utils/apiFeatures')

exports.addToCart = async (req, res, next) => {
    const { name, price, quantity, image, product, productStock } = req.body
    // console.log(req.body)
    // console.log(req.session.cart)
    //  req.session.cart = {}
    const cart = new Cart2(req.session.cart ? req.session.cart : {})
    // console.log(cart)
    try {
        console.log("cart items", cart.cartItems)
        const itemIndex = cart.cartItems.findIndex(prod => prod.product.toString() === product)
        if (itemIndex > -1) {
            let item = cart.cartItems[itemIndex]
            item.quantity = item.quantity + quantity
            cart.cartItems[itemIndex] = item

        }
        else {
            cart.cartItems.push({ name, price, quantity, image, product, productStock })
        }
        await cart.calcTotalQtyAndPrice()
        req.session.cart = cart;
        return res.status(200).send({
            success: true,
            message: 'Item has been successfully added to cart!',
            cart
        })

    }
    catch (err) {
        next(err)
    }
}

