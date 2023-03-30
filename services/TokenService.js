const {sign, verify} = require('jsonwebtoken')

class TokenService {
    generateTokens(id, email) {
        const payload = {id, email}
        const accessToken = sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: "24h"})
        return {accessToken}
    }

    validateAccessToken(token) {
        try {
            const userData = verify(token, process.env.SECRET_KEY_TOKEN)
            return userData
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()
