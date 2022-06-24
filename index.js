require('dotenv').config()
require('./config/connectdb')
const express = require('express')
const routes = require('./routes/auth')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', routes)
app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))