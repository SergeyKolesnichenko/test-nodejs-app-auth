const AthException = require("../exceptions/AthException");
const User = require("../models/User");
const IdType = require("../models/IdType");

const bcrypt = require('bcryptjs');
const tokenService = require("./tokenService");

class UserService{
    async registration(id, password, idType){
        const candidate = await User.findOne({id});
    
        if(candidate){
            throw AthException.BadRequest("User already exists!");
        }
    
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        
        const idTypeObj = await IdType.findOne({value: idType});
        if(!idTypeObj){
            throw AthException.InvalidData("Invalid id type");
        }

        const user = new User({id: id,password: hashPassword, idType: idTypeObj.value});
        await user.save();

        const tokens = tokenService.generateTokens({id, password});
        await tokenService.saveRefreshToken(user._id, tokens.refresh);
        
        return {tokens: tokens, user: {id, password}};
    }

    async login(id, password){
        const user = await User.findOne({id});

        if(!user){
            throw AthException.BadRequest('User`s id doesnt exist');
        }

        if(!(await bcrypt.compare(password, user.password))){
            throw AthException.BadRequest('Incorrect password');
        }

        await tokenService.removeExpiredTokens(user._id);
        const tokens = tokenService.generateTokens({id, password});
        await tokenService.saveRefreshToken(user._id, tokens.refresh);
    
        return {tokens: tokens, user: {id, password}};
    }

    async logout(refreshToken, all = false){
        if(all){
            return await tokenService.removeToken(refreshToken);
        }else{
            return await tokenService.removeTokens(refreshToken);
        }
    }
}

module.exports = new UserService();