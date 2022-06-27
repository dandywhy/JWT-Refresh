import mongoose from 'mongoose'

mongoose.connect(process.env.URI_MONGODB)

const db = mongoose.connection

db.on('error', () => console.log('MongoDB connected error'))

db.once('open', () => console.log('MongoDB connected success'))

