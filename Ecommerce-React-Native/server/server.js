import express from "express"
import colors from 'colors'
import morgan from "morgan"
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cloudinary from 'cloudinary'
import Stripe from "stripe"
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
// route imports
import testRoute from './routes/testRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoute from './routes/orderRoute.js'
import userRoutes from './routes/userRoute.js'
import connectDB from "./config/db.js"
import productRoutes from './routes/productRoute.js'
// dotenv config
dotenv.config();

// database connection
connectDB();

// stripe config
export const stripe=new Stripe(process.env.STRIPE_API_SECRET)
// cloudinary config
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
})

// rest object
const app=express()


// middleware
app.use(helmet())
app.use(mongoSanitize())
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// route

app.use('/api/v1',testRoute)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/product',productRoutes)
app.use('/api/v1/cat',categoryRoutes)
app.use('/api/v1/order',orderRoute)




// port
const PORT=process.env.PORT || 8080

// listen
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} on ${process.env.NODE_ENV} mode`.bgBlue.white)
})