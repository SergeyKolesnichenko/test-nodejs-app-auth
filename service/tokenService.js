const jwt = require("jsonwebtoken");
const tokenModel = require("../models/Token");

class TokenService{
    generateTokens(obj){
        const access = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        const refresh = jwt.sign(obj, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2h'});

        return {access, refresh};
    }

    validateAccessToken(token){
        try{
            const obj = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            return obj;
        }catch(e){
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const obj = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            return obj;
        }catch(e){
            return null;
        }
    }

    async saveRefreshToken(userId, token){
        const candidate = await tokenModel.findOne({user: userId});

        if(candidate){
            candidate.refreshTokens.push(token);
            return candidate.save();
        }

        const tokenObj = new tokenModel({user: userId, refreshTokens: [token]});
        return tokenObj.save();
    }

    async removeExpiredTokens(userId){
        const candidate = await tokenModel.findOne({user: userId});

        if(candidate){
            for(let i=0;i<candidate.refreshTokens.length;i++){
                if(!validateRefreshToken(candidate.refreshTokens[i])){
                    delete candidate.refreshTokens[i--];
                }
            }

            return candidate.save();
        }
    }

    async removeToken(token){
        const tokenData = await tokenModel.findOne({refreshTokens: token});
        tokenData.refreshTokens.remove(token);
        tokenData.save();

        return tokenData;
    }

    async removeTokens(token){
        const tokenData = await tokenModel.findOne({refreshTokens: token});
        tokenData.refreshTokens = [];
        tokenData.save();
        
        return tokenData;
    }

    async findToken(token){
        const tokenData = await tokenModel.findOne({refreshTokens: token})
        return tokenData;
    }
}

module.exports = new TokenService();