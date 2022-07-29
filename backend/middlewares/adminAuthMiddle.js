const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const Adminprotect = asyncHandler(async (req, res, next) => {
    let token
    //chcking is token is bearer token and containg Bearer 
    let BearerToken = req.headers.authorization.split(' ')[0] === 'Bearer';

    if (req.headers.authorization && BearerToken) {
        try {
            // get token from header
            token = req.headers.authorization.split(' ')[1]

            // verfi token
            const encode = jwt.verify(token, process.env.JWT_SECRET)

            //assigning to the user object
            req.user = encode

            next()
        } catch (error) {
            console.log(error)
            res.json({ status: 401, "message": "Not autherized" })


        }
    } else {
        res.json({ status: 400, "message": "No autherized, no token" })
    }

})

module.exports = {
    Adminprotect
}