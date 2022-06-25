const jwt = require('jsonwebtoken')
const { tokenVerificationErrors } = require('../utils/tokenManager')

module.exports = {
  requireRefreshToken: (req, res, next) => {
    try {
      const refreshTokenCookie = req.cookies.refreshToken
      if (!refreshTokenCookie) throw new Error('No existed token')

      const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
      
      req.uid = uid
      next()
    } catch (err) {
      console.log(err)
      res.status(401).json({ error: tokenVerificationErrors[err.message] })
    }
  }
}

