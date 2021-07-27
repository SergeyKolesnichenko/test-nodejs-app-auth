const AthException = require("../exceptions/AthException");
const Utility = require("../utility/utility");

module.exports = async (req, res, next) => {
    try{
        const {id, password} = req.body;

        if(Utility.isStringHaveSpaces(id)){
            return next(AthException.InvalidData('Id has spaces'));
        }

        if(Utility.isStringHaveSpaces(password)){
            return next(AthException.InvalidData('Password has spaces'));
        }

        if(!Utility.isLengthInRange(password, 8, 32)){
            return next(AthException.InvalidData('Password must has more than 8 characters'));
        }

        if(Utility.isEmail(id)){
            req.body.idType = "email";
        }
        else if(Utility.isPhoneNumber(id)){
            req.body.idType = "phone";
        }else{
            return next(AthException.InvalidData('Invalid id')); 
        }

        next();
    }catch(e){
        return next(AthException.UnauthorizedError());
    }
}