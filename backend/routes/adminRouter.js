const express = require('express')
const { loginAdmin, adminData, allUser, blockUser, unBlockUser } = require('../controllers/adminController')
const { Adminprotect } = require('../middlewares/adminAuthMiddle')
const route = express.Router()

route.post('/login', loginAdmin)
route.get('/', Adminprotect, adminData)
route.get('/userData', Adminprotect, allUser)
route.post('/blockUser', Adminprotect, blockUser)
route.post('/unBlockUser', Adminprotect, unBlockUser)

module.exports = route