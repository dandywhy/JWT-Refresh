const jwt = require('jsonwebtoken')
const { tokenVerificationErrors } =  require('../utils/tokenManager')

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

      return res
        .status(401)
        .json({ error: tokenVerificationErrors[error.message] })
    }
  }
}