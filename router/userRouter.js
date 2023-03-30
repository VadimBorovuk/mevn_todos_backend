const express = require('express')
const UserController = require('../controllers/UserController')
const authMiddleware = require('../middleware/auth-middle')
const userRouter = express.Router()

const {check} = require('express-validator')

userRouter.post('/registration', [
    check('email', "Email must be correct and not empty").isEmail(),
    check('password', "Password must be min 4 max 20").isLength({min: 4, max: 20})
], UserController.registration)

userRouter.post('/login', [
    check('email', "Email must be correct and not empty").isEmail(),
    check('password', "Password must be min 4 max 20").isLength({min: 4, max: 20})
], UserController.login)
userRouter.get('/access', authMiddleware, UserController.getAccess)

module.exports = userRouter
