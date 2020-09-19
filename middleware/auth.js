const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    // Get token from header
    const token = req.header('x-auth-token')
    // If NoToken is passed
    if(!token){
        return res.status(401).json({ msg: 'Authorization Denied' })
    }
    // Token Verification
    try{
        const decoded = jwt.verify(token, config.get('JWT_SECRET_KEY'))
        req.user = decoded.user
        next()
    }catch(e){
        return res.status(401).json({msg: 'Authorization Unsuccessful'})
    }
}