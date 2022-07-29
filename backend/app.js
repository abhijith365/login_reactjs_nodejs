const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const connectDb = require('./config/db')
const app = express()

//Load config
dotenv.config({ path: '../backend/config/config.env' })

//mongodb connection
connectDb()

// body parse && middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//routes
app.use('/', require('./routes/userRouter'))
app.use('/admin', require('./routes/adminRouter'))

//PORT NUMBER
const PORT = process.env.PORT || 8080

//server port
app.listen(PORT, () => { console.log(`runing on port ${PORT}`) })