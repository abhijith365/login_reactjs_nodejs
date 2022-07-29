const express = require('express')
const route = express.Router()
const {
    loginUser,
    registerUser,
    userData } = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')



//login -> checking user authentication
route.post('/login', loginUser)

//register -> createing new user
route.post('/reg', registerUser)

//user => get user Data
route.get('/user', protect, userData)


module.exports = route