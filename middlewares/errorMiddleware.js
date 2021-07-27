const AthException = require("../exceptions/AthException");

module.exports = (err, req, res, next) => {
    console.log(err);

    if (err instanceof AthException) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Error'});
}