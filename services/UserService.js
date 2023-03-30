const bcrypt = require('bcryptjs');

const userSchema = require("../schema/userSchema");
const tokenService = require("../services/TokenService");
const UserDto = require("../dtos/user-dto");

class TaskService {
    async registrationService(body) {
        let {email, password} = body
        const candidate = await userSchema.findOne({email})
        if(candidate) return false;

        const hashPasw = bcrypt.hashSync(password, 7)
        const user = await userSchema.create({...body, password: hashPasw})
        await user.save()
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        return {...tokens, user: userDto}
    }

    async loginUser(body) {
        let {email, password} = body
        const user = await userSchema.findOne({email})
        if (!user) {
            return 'EmailNotFound'
        }
        const validPassword = await bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return 'PasswordNotValid'
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        return {...tokens, user: userDto}
    }

    async getUsers() {
       return userSchema.find();
    }
}

module.exports = new TaskService()
