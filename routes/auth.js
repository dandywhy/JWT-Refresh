const express = require('express')
const { body } = require('express-validator')
const authController = require('../controllers/auth-controller')
const { requireToken } = require('../middlewares/requireToken')
const { validationResultExpress } = require('../middlewares/validationResultExpress')
const router = express.Router()

router.post('/register',
  [
    body('email', 'Email is not correct')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Password minimum 6 chars')
      .trim()
      .isLength({ min: 6 }),
    body('password', 'Password is incorrect')
      .custom((value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error('No match repassword')
        }
        return value
      })
  ],
  validationResultExpress,
  authController.register
)
router.post('/login',
  [
    body('email', 'Email is not correct')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Password minimum 6 chars')
      .trim()
      .isLength({ min: 6 })
  ],
  validationResultExpress,
  authController.login
)

router.get('/protected', requireToken, authController.infoUser)
router.get('/refresh', authController.refreshToken)
router.get('/logout', authController.logout)

module.exports = router