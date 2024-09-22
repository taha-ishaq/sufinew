const mongoose = require('mongoose');



const connectDB= async()=>{
    try {
       await mongoose.connect('mongodb+srv://sufiyakhanum:35xMBpSDDn2Eagt7@cluster0.3xnlf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{console.log('MongoDb connected')})
    } catch (error) {
        console.error(error)
    }
}

module.exports = connectDB