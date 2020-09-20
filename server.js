const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('SERVER RUNNING')
})

app.use('/api/user', require('./routes/api/user'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))

app.use('/jobs/data', require('./routes/jobs/data'))

app.listen(PORT, ()=>{
    console.log(`Server Up and Running on Port ${PORT}`)
})