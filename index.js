import 'dotenv/config'
import './config/connectdb.js'
import cookieParser from 'cookie-parser'
import express from 'express'

import authRouter from './routes/auth.js'
import linkRouter from './routes/link.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))