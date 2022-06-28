import 'dotenv/config'
import './config/connectdb.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.js'
import linkRouter from './routes/link.js'
import redirectRouter from './routes/redirect.js'

const app = express()

const whiteList = [process.env.ORIGIN1]

app.use(cors({
  origin: function(origin, callback) {
    if (whiteList.includes(origin)) {
      return callback(null, origin)
    }
    return callback('Error cors origin: ' + origin + ' No authorization')
  }
}))

app.use(express.json())
app.use(cookieParser())

app.use('/', redirectRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRouter)

// app.use(express.static('public'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))