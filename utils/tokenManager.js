const jwt = require('jsonwebtoken')

module.exports = {
  generateToken: (uid) => {
    const expiresIn = 60 * 15

    try {
      const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
      return { token, expiresIn }
    } catch (err) {
      console.log(err)
    }
  },
  generateRefreshToken: (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30
    try {
      const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, { expiresIn })
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODE === 'developer'),
        expires: new Date(Date.now() + expiresIn * 1000)
      })
    } catch (err) {
      console.log(err)
    }
  }
}