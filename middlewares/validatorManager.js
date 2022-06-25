const { validationResult, body } = require('express-validator')

module.exports = {
  validationResultExpress: (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
  
    next()
  },
  bodyRegisterValidator: [
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
  bodyLoginValidator: [
    body('email', 'Email is not correct')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Password minimum 6 chars')
      .trim()
      .isLength({ min: 6 })
  ]
}