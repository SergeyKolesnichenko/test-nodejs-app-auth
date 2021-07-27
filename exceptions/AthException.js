module.exports = class AthException extends Error{
    status;
    errors;

    constructor(status, message, errors = []){
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AthException(401, 'user is not unauthorized');
    }

    static BadRequest(message, errors = []){
        return new AthException(400, message, errors);
    }

    static InvalidData(message, errors = []){
        return new AthException(402, message, errors);
    }
}
