const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add  name']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
    status:{
        type: Boolean,
        default:true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)
