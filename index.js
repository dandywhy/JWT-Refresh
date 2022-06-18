require('dotenv').config()
require('./config/connectdb')
const express = require('express')
const app = express()
const routes = require('./routes/auth')

app.use(express.json())
app.use('/api/v1/auth', routes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))