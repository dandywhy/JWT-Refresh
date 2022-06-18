const { validationResult } = require('express-validator')

const authController = {
  register: (req, res) => {
    res.json({ ok: 'register' })
  },
  login: (req, res) => {
    res.json({ ok: 'login' })
  }
}

module.exports = authController