const express = require('express')
const router = express.Router()
const request = require('request')
const auth = require('../../middleware/auth')
const cors = require('cors')
const { response } = require('express')

router.use(cors())

router.post('/', auth, (req,res) => {
    try{

        const {
            description,
            location,
            isFullTime
        } = req.body

        const url = `http://jobs.github.com/positions.json?description=${description}&full_time=${isFullTime}&location=${location}`


        request(url, (error,response,body)=>{
            if(error){
                return res.status(400).json({msg: 'Error'})
            }
            return res.status(200).json(body)
        })

    }catch(e){
        console.log(e.message)
        res.status(500).json({
            msg: "Server Error"
        })
    }
})

module.exports = router