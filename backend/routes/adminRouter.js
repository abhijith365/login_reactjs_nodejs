const express = require('express')
const { loginAdmin, adminData, allUser, blockUser, unBlockUser, userData, saveEdit } = require('../controllers/adminController')
const { Adminprotect } = require('../middlewares/adminAuthMiddle')
const route = express.Router()

route.post('/login', loginAdmin)
route.get('/', Adminprotect, adminData)
route.get('/userData', Adminprotect, allUser)
route.post('/blockUser', Adminprotect, blockUser)
route.post('/unBlockUser', Adminprotect, unBlockUser)
route.post('/user/edit/', Adminprotect, userData)
route.post('/user/saveEdit/', Adminprotect, saveEdit)

module.exports = route