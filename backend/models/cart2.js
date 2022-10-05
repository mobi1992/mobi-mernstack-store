const mongoose = require('mongoose')

const cartSchema2 = new mongoose.Schema({
    cartItems : [ 
        {
        name : {
            type : String,
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        quantity : {
            type : Number,
            required : true
        },
        image : {
            type : String,
            required : true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true 
        } ,
        productStock : {
            type : Number,
            required : true
        }
    }
    ],

    totalQuantity : {
        type : Number,
        required : true,
        default : 0
    },

    totalPrice : {
        type : Number,
        required : true,
        default : 0
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: false,
    //   },
},
{
    timestamps : true
})

// cartSchema.methods.calcIndTotalQtyAndPrice = async function (qty, pr) {
//     const cart = this
//     let totalQty = cart.totalIndQuantity
//     let totalP = pr
//     totalQty = qty
//     console.log(totalQty)
//     totalPr = totalP * totalQty
//     console.log(totalP)
//     cart.totalIndQuantity = totalQty
//     cart.totalIndPrice = totalPr
//     await cart.save()
// }

cartSchema2.methods.calcTotalQtyAndPrice = async function () {
    const cart = this
    let sum = 0
    let qty = 0
    cart.cartItems.forEach(item => {
        sum = sum + item.quantity * item.price
        qty = qty + item.quantity
    })       
     cart.totalQuantity = qty
     cart.totalPrice = sum
    //  await cart.save()
} 

cartSchema2.methods.removeFromTheCart = async function(prod) {
    const cart = this
    const filteredProducts = cart.cartItems.filter(item => item.product.toString() !== prod)
    cart.cartItems = filteredProducts
    // await cart.save()
}
const Cart2 = mongoose.model('Cart2', cartSchema2)
module.exports = Cart2