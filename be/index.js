const express = require('express');
const connectDB = require('./mongoConf/mongoConf')
const dotenv= require('dotenv');
const adminRouter = require ('./routes/adminRoute');
const productRoutes = require('./routes/productRoutes')
const checkoutRoute= require ('./routes/checkoutRoutes')
const app= express();
const cors=require('cors');
app.use(express.json());
require('dotenv').config()
app.use(cors());
app.get('/',(req,res)=>{
    res.send('King was here')
});

app.use(express.urlencoded({ extended: true }));
app.use('/v2/admin',adminRouter)
app.use('/v2/products',productRoutes)
app.use('/v2/checkout',checkoutRoute)
connectDB();
const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);
})