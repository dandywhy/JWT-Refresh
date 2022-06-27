import { validationResult, body, param } from 'express-validator'
import axios from 'axios'

export const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}

export const paramsLinkValidator = [
  param('id', 'Incorrect form')
    .trim()
    .notEmpty()
    .escape(),
  validationResultExpress
]

export const bodyRegisterValidator = [
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
    }),
  validationResultExpress
]

export const bodyLoginValidator = [
  body('email', 'Email is not correct')
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password', 'Password minimum 6 chars')
    .trim()
    .isLength({ min: 6 }),
  validationResultExpress
]

export const bodyLinkValidator = [
  body('longLink', 'Incorrect form to link')
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      try {
        if (!value.startsWith('https://')) {
          value = 'https://' + value
        }
        await axios.get(value)
        
        return value
      } catch (err) {
        console.log(err)
        throw new Error('Not found lognlink 404')
      }
    }),
  validationResultExpress
]