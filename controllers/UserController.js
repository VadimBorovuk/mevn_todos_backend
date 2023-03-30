const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-err')
const UserService = require('../services/UserService')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw ApiError.BadRequest('Error of validation', errors.array())

            const user = await UserService.registrationService(req.body)
            if (!user) throw ApiError.BadRequest(`This ${req.body.email} is exist`)

            res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            let user = await UserService.loginUser(req.body)
            if (user === 'EmailNotFound') throw ApiError.BadRequest('Email not found')
            if (user === 'PasswordNotValid') throw ApiError.BadRequest('Is not valid password')
            res.status(201).json({message: 'user login successfully', token: user})
        } catch (e) {
            next(e)
        }
    }

    async getAccess(req, res, next) {
        try {
            let users = await UserService.getUsers(req.body)
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()
