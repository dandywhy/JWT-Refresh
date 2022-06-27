import { User } from '../models/User.js'
import { generateToken, generateRefreshToken } from '../utils/tokenManager.js'

export const register = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })

    if (user) throw ({ code: 11000 })

    user = new User({ email, password })
    await user.save()

    // generate jwt token
    const { token, expiresIn } = generateToken(user.id)
    generateRefreshToken(user.id, res)

    return res.status(201).json({ token, expiresIn })
  } catch (err) {
    console.log(err)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Existed email'})
    }
    return res.status(500).json({ error: 'Server error' })
  }
}

export const login = async (req, res) => {
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
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ ok: true })
}

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean()
    return res.json({ email: user.email, uid: user.id })
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'Server error' })
  }
}

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid)

    return res.json({ token, expiresIn })
  } catch (err) {
    console.log(err.message)

    return res
      .status(500)
      .json({ error: 'Server error' })
  }
}