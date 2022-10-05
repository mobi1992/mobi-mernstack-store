// const nodemailer = require('nodemailer')

// const sendEmail = async ({email, subject, message}) => {   // destructuring from the object
//     const transporter = nodemailer.createTransport({
//         service : process.env.SMPT_SERVICE,
//         host : process.env.SMTP_HOST,
//         port : process.env.SMTP_PORT,
//         auth : {
//             user : process.env.SMPT_USER,
//             pass : process.env.SMPT_PASSWORD,
//         }
//     })

//     const mailOptions = {
//         from : process.env.SMPT_USER,
//         to : email,
//         subject,
//         text : message,
//     }

//     await transporter.sendMail(mailOptions)
// }

// module.exports = sendEmail

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to : 'farankidscampus2@gmail.com',
//     from : 'mobeenamushtaq2@gmail.com',
//     subject : 'This is first mail',
//     text : 'Hi Mobeena, how are you?'
// })

const sendPasswordRecoveryMail = (email, message) => {
    sgMail.send({
        to : email,
        from : 'yahyaabdullah1877@gmail.com',
        subject : 'Ecommerce Website password recovery',
        text : message
    })
}
const sendOrderConfirmationMailUnkUsr = (order) => {
    sgMail.send({
        to : order.shippingInfo.email,
        from : 'yahyaabdullah1877@gmail.com',
        subject : 'Your Order has been confirmed!',
        text : `Your order #${order.orderNo} has been confirmed! \n\n Total amount is Rs${order.totalPrice} including Rs${order.shippingPrice} shipping price for ${order.cart.totalQty} item/items. \n\n You can view the order confirmation at the following link ${req.protocol}://${req.get(
            "host"
        )}/order/${order._id}`
    })
}

const sendOrderConfirmationMailLoggedinUsr = (order) => {
    sgMail.send({
        to : order.shippingInfo.email,
        from : 'yahyaabdullah1877@gmail.com',
        subject : 'Your Order has been confirmed!',
        text : `Your order #${order.orderNo} has been confirmed! \n\n Total amount is Rs${order.totalPrice} including Rs${order.shippingPrice} shipping price for ${order.cart.totalQty} item/items. \n\n You can log in to your account to view details about your order`
    })
}

module.exports = {
    sendPasswordRecoveryMail,
    sendOrderConfirmationMailUnkUsr,
    sendOrderConfirmationMailLoggedinUsr
}