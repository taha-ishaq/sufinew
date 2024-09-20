const mongoose = require('mongoose');



const connectDB= async()=>{
    try {
       await mongoose.connect('mongodb://0.0.0.0:27017/').then(()=>{console.log('MongoDb connected')})
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB