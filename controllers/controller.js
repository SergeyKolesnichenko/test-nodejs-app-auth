const mongoose = require("mongoose");

const userService = require("../service/userService");
const utility = require("../utility/utility");

class Controller{
    async singin(req, res, next){
        try{
            const {id, password, idType} = req.body;
            
            const userData = await userService.registration(id, password, idType);
            res.cookie('refreshToken', userData.tokens.refresh, {maxAge: 12 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async singup(req, res, next){
        try{
            const {id, password} = req.body;
            
            const userData = await userService.login(id, password);
            res.cookie('refreshToken', userData.tokens.refresh, {maxAge: 12 * 60 * 60 * 1000, httpOnly: true});
            
            return res.json(userData);
        }catch(e){
            next(e);
        }
    }

    async latency(req, res, next){
        try{
            utility.getPingFromUrl("google.com", (ping) => {
                let pingJSON = {ping: ping};
                res.send(pingJSON);
            });
        }catch(e){
            next(e);
        }
    }

    async info(req, res, next){
        try{
            const id = req.user.id;
            const password = req.user.password;

            return res.json({id: id, password: password});
        }catch(e){
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const {all} = req.body;

            const token = await userService.logout(refreshToken, all);
            res.clearCookie('refreshToken');

            return res.json({status: "OK"});
        }catch(e){
            next(e);
        }
    }
}

module.exports = new Controller();