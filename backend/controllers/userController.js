const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
   return jwt.sign({ _id: _id || id }, process.env.SECRET, { expiresIn: '3d' })
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        //signup taken from userModel.js
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })
        //before creating token
        // res.status(200).json({ email, user })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    //for testing on postman
    // res.json({ mssg: 'login user' })
}

//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        //signup taken from userModel.js
        const user = await User.signup(email, password)

        const token = createToken(user._id)

        res.status(200).json({ email, token })
        //before creating token
        // res.status(200).json({ email, user })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    //for testing on postman
    // res.json({ mssg: 'login user' })
}


module.exports ={
    loginUser,
    signupUser
}