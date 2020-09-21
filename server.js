const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cors())

app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))

app.use('/jobs/data', require('./routes/jobs/data'))

// Serve Static assets in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log(`Server Up and Running on Port ${PORT}`)
})