const jwt = require('jsonwebtoken')

module.exports = {
  requireToken: (req, res, next) => {
    try {
      let token = req.headers?.authorization

      if (!token) {
        throw new Error('No existed token')
      }
      token = token.split(' ')[1]
      const { uid } = jwt.verify(token, process.env.JWT_SECRET)
      req.uid = uid
      next()
    } catch (error) {
      console.log(error.message)

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