const ApiError = require('../exceptions/api-err')
const tokenService = require('../services/TokenService')

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) next(ApiError.UnauthorizedError())

        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) next(ApiError.UnauthorizedError())

        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) next(ApiError.UnauthorizedError())
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
