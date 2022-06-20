const User = require('../models/User.js')

const authController = {
  register: async (req, res) => {
    const { email, password } = req.body
    try {
      let user = await User.findOne({ email })

      if (user) throw ({ code: 11000 })

      user = new User({ email, password })
      await user.save()

      // generate jwt token

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

      res.json({ login: true })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Server error' }) 
    }
  }
}

module.exports = authController