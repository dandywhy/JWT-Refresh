const User = require('../models/User.js')

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body
    try {
      const user = new User({ email, password })
      await user.save()

      return res.json({ ok: 'register' })
    } catch (err) { console.log(err) }
    
  },
  login: (req, res) => {
    res.json({ ok: 'login' })
  }
}

module.exports = authController