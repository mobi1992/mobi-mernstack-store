const express = require('express')
require('./db/mongoose')
const app = express()
const productRouter = require('./routes/productRoute')
const categoryRouter = require('./routes/categoryRoute')
const userRouter = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const errorMiddleware = require('./middleware/error')
const cartRoute = require('./routes/cartRoute')
const cartRoute2 = require('./routes/cartRoute2')
const orderRoute = require('./routes/orderRoute')
const newsLetterRoute = require('./routes/newsLetterRoute')
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary')
const path = require("path");
const MongoStore = require('connect-mongo');
const session = require('express-session')
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

  
// to parse the json so that it can become an object
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({limit: "50mb", extended: true }))
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true }));
app.use(fileUpload());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    cookie: {maxAge: 10 * 60 * 1000}
}));

//Handling uncaught exception
process.on('uncaughtException', err => {
    console.log(`Error : ${err.message}`)
    console.log('Shutting down the server because of uncaught error')
    process.exit(1)
})
app.use(productRouter)
app.use(categoryRouter)
app.use(userRouter)
app.use(adminRoute)
app.use(cartRoute)
app.use(cartRoute2)
app.use(orderRoute)
app.use(newsLetterRoute)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})
app.use(errorMiddleware)
// app.use(function(req, res, next) {
//     res.locals.session = req.session;
//     next();
//  });
// cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
    secure : true
})

const server = app.listen(process.env.PORT, () => {
    console.log('Server is up on the port : ', process.env.PORT)
})
//console.log(fg)
// unhandled promise rejection, this type of error can occur when database url might be wrong
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`)
    console.log('Shutting down the server because of unhandled promise rejection')
    server.close(() => {
        process.exit(1)
    })
})