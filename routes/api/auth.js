const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
// Route - GET api/auth
// DESC  - GET A TOKEN AND AUTHORIZE USER
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        return res.status(200).json(user)
    }catch(e){
        console.error(e.message)
        return res.status(500).json({ msg: 'Server Error' })
    }
})

// Route - POST api/auth
// Desc  - Authenticate User & SEND Token
router.post('/', [
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password Mandatory').exists()
    ],
    async (req, res) => {
        const err = validationResult(req)
        if (!err.isEmpty()) {
            return res.status(400).json({
                errors: err.array()
            })
        }
        const {
            email,
            password
        } = req.body
        try {
            let user = await User.findOne({
                email: email
            })

            // SEE IF USER DOESN'T EXIST IN DB
            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
            }

            // CHECK IF PASSWORD IS VALID
            const isMatched = await bcrypt.compare(password, user.password)
            if(!isMatched){
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
            }

            // RETURN JWT IF CREDENTIALS ARE CORRECT
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('JWT_SECRET_KEY'), {
                    expiresIn: 3600000
                },
                (err, token) => {
                    if (err) throw err
                    return res.status(200).json({
                        token
                    })
                })
        } catch (e) {
            console.err(e.message)
            res.status(500).send('Server Error')
        }
    })

module.exports = router