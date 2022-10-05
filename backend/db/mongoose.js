const mongoose = require('mongoose')
//connecting to the database, mongoose uses the mongodb behind the scene 
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser : true, useUnifiedTopology : true}).then(data => console.log(`MongoDB is connected with server : ${data.connection.host}`))