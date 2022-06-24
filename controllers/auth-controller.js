const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const { generateToken, generateRefreshToken } = require('../utils/tokenManager.js')

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (user) throw ({ code: 11000 })

      user = new User({ email, password })
      await user.save()

      return res.status(201).json({ register: true })
    } catch (err) {
      console.log(err)
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Existed email'})
      }
      return res.status(500).json({ error: 'Server error' })
    }
    
  },
  login: async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })
      if (!user) return res.status(403).json({ error: "Not existed email"})

      const responsePassword = await user.comparePassword(password)
      if (!responsePassword) return res.status(403).json({ error: "Wrong password"})

      // generate jwt token
      const { token, expiresIn } = generateToken(user.id)
      generateRefreshToken(user.id, res)

      res.json({ token, expiresIn })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Server error' }) 
    }
  },
  logout: (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ ok: true })
  },
  infoUser: async (req, res) => {
    try {
      const user = await User.findById(req.uid).lean()
      return res.json({ email: user.email, uid: user.id })
    } catch (err) {
      return res.status(500).json({ error: 'Server error' })
    }
  },
  refreshToken: (req, res) => {
    try {
      const refreshTokenCookie = req.cookies.refreshToken
      if (!refreshTokenCookie) throw new Error('No existed token')

      const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
      const { token, expiresIn } = generateToken(uid)

      return res.json({ token, expiresIn })
    } catch (err) {
      console.log(err.message)
      const TokenVerificationErrors = {
        'invalid signature': 'JWT signature invalid',
        'jwt expired': 'JWT expired',
        'invalid token': 'Token invalid',
        'No Bearer': 'Incorrect form Bearer',
        'jwt malformed': 'JWT malformed',
        'jwt must be provided': 'JWT not provide'
      }

      return res
        .status(401)
        .json({ error: TokenVerificationErrors[error.message] })
    }
  }
}

module.exports = authController