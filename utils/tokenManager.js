import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
  const expiresIn = 60 * 15

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn })
    return { token, expiresIn }
  } catch (err) {
    console.log(err)
  }
}

export const generateRefreshToken = (uid, res) => {
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

export const tokenVerificationErrors = {
  'invalid signature': 'JWT signature invalid',
  'jwt expired': 'JWT expired',
  'invalid token': 'Token invalid',
  'No Bearer': 'Incorrect form Bearer',
  'jwt malformed': 'JWT malformed',
  'jwt must be provided': 'JWT not provide',
}
