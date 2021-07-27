const AthException = require("../exceptions/AthException");
const Token = require("../service/tokenService");

module.exports = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        
        if(!authHeader){
            return next(AthException.UnauthorizedError());
        }

        const accessToken = authHeader.split(' ')[1];
        if(!accessToken){
            return next(AthException.UnauthorizedError());
        }

        const userData = Token.validateAccessToken(accessToken);
        if(!userData){
            return next(AthException.UnauthorizedError());
        }

        req.user = userData;

        next();
    }catch(e){
        return next(AthException.UnauthorizedError());
    }
}