const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')

// User Model
const User = require('../../models/User')

// Route - POST api/users
// Desc  - Register Users
router.post('/', [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid Email').isEmail(),
        check('password', 'Password showld be 6 or more characters').isLength({ min:6 })
    ],
    async (req,res)=> {
        const err = validationResult(req)
        if(!err.isEmpty()){
            return res.status(400).json({ errors:err.array() })
        }
        const { name, email, password } = req.body
        try{
            let user = await User.findOne({ email:email })

            // SEE IF USER ALREADY EXIST IN DB
            if(user){
                return res.status(400).json({ errors: [ {msg: 'Email already exists'} ] })
            }
            user = new User({
                name,
                email,
                password
            })
            
            // ENCRYPT PASSWORD
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            // SAVE USER DATA TO DB
            await user.save()

            // RETURN JWT
            const payload = {
                user : {
                    id: user.id
                }
            }
            jwt.sign(
                payload, 
                config.get('JWT_SECRET_KEY'),
                { expiresIn: 3600000 },
                (err,token)=>{
                    if(err) throw err
                    return res.status(200).json({ token })
                })
        }catch(e){
            console.err(e.message)
            res.status(500).send('Server Error')
        }
})

module.exports = router