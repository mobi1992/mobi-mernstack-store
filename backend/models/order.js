const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    orderNo : {
        type : String
    },

    shippingInfo: {
        firstName: {
            type: String,
            required: [true, 'Please enter your first name.']
        },
        lastName: {
            type: String,
            required: [true, 'Please enter your last name.']
        },
        address: {
            type: String,
            required: [true, 'Please enter your address.']
        },
        city: {
            type: String,
            required: [true, 'Please enter yout city.']
        },
        province: {
            type: String,
            required: [true, 'Please select yout province.']
        },
        country: {
            type: String,
            required: [true, 'Please select your country.']
        },
        postalCode: {
            type: Number,
            required: [true, 'Please enter the pin code / postal code.']
        },
        phoneNo: {
            type: String,
            required: [true, 'Please enter your phone number.']
        },

        email: {
            type: String,
            required: [true, 'Please enter your email address.']
        },
    },

    cart: {
        orderItems: [
            {
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                productStock: {
                    type : Number,
                    required : true
                }
            }
        ],
        totalQty: {
            type: Number,
            default: 0,
            required: true,
        },
        totalCost: {
            type: Number,
            default: 0,
            required: true,
        }
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },

    paymentInfo: {
        // id: {
        //     type: String,
        //     required: true
        // },
        // status: {
        //     type: String,
        //     required: true
        // }
        type : String,
        required : true
    },

    placedAt: {
        type: String,
        required: true
    },

    shippingPrice: {
        type: Number,
        required: true,
        default: 0
    },

    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },

    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },

    userAgent : {
        type : String,
        required : true
    },
    
    deliveredAt: {
        type: String,
    },
    createdOrderAt : {
        type : Date,
        default : new Date().toDateString()
    }
},
    {
        timestamps: true
    })
orderSchema.methods.generateOrderNo = async function() {
    const order = this
    const orderNo = Math.floor(Math.random() * 100000000);
    const orderNum = orderNo.toString()
    order.orderNo = 'RY-' + orderNum
    await order.save()
}
const Order = mongoose.model('Order', orderSchema)
module.exports = Order