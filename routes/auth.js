const express = require('express')
const authController = require('../controllers/auth-controller')
const { requireToken } = require('../middlewares/requireToken')
const { requireRefreshToken } = require('../middlewares/requireRefreshToken')
const { validationResultExpress, bodyRegisterValidator, bodyLoginValidator } = require('../middlewares/validatorManager.js')
const router = express.Router()

router.post('/register', bodyRegisterValidator, validationResultExpress, authController.register)
router.post('/login', bodyLoginValidator, validationResultExpress, authController.login)

router.get('/protected', requireToken, authController.infoUser)
router.get('/refresh', requireRefreshToken, authController.refreshToken)
router.get('/logout', authController.logout)

module.exports = router