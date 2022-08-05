//for validate  user {public}
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = { email: process.env.ADMIN_NAME, password: process.env.ADMIN_PASS }

    if (user.email == email && user.password == password) {
        res.json({
            status: 201,
            message: 'good',
            data: [{
                password: user.password,
                email: user.email,
                token: generateToken(user)
            }]
        })
    } else {
        res.json({
            status: 400,
            "message": "Invalid credential",
            data: false
        })
    }

})

const adminData = asyncHandler(async (req, res) => {
    const { email, password } = req.user;
    res.json({ data: { email, password } })
})

const allUser = asyncHandler(async (req, res) => {
    let user = await User.find()
    res.json({ status: 201, message: 'success', data: user })
})

const blockUser = asyncHandler(async (req, res) => {
    let { _id } = req.body
    let blockUser = await User.updateOne({ _id }, { $set: { status: false } })
    if (blockUser) {
        res.json({ status: 201, message: 'success', data: true })
    } else {
        res.json({ status: 400, message: 'success', data: false })
    }
})

const unBlockUser = asyncHandler(async (req, res) => {
    let { _id } = req.body
    let blockUser = await User.updateOne({ _id }, { $set: { status: true } })
    if (blockUser) {
        res.json({ status: 201, message: 'success', data: true })
    } else {
        res.json({ status: 400, message: 'success', data: false })
    }
})
//get single user detail

const userData = asyncHandler(async (req, res) => {
    try {
        const id = req.body.id
        const user = await User.findById(id)
        const data = { id: user._id, name: user.name, "email": user.email }
        res.status(201).json({ status: 201, message: 'success', data: data })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: 400, message: "user not exit", data: false })
    }
})

// saved edited user
const saveEdit = asyncHandler(async (req, res) => {
    try {
        const id = req.body.id
        const data = { name: req.body.name, "email": req.body.email }
        const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true })
        res.status(201).json({ status: 201, message: 'success', data: user })
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: 400, message: "user not exit", data: false })
    }
})

//generate JWT
const generateToken = (obj) => {
    console.log(obj)
    let data = { email: obj.email, password: obj.password }
    return jwt.sign(obj, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

module.exports = {
    loginAdmin,
    adminData,
    allUser,
    blockUser,
    unBlockUser,
    userData,
    saveEdit
}