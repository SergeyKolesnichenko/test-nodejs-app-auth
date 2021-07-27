const mongoose = require("mongoose");

const User = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true},
    idType: {type: String, ref: 'IdType', required: true}
});

module.exports = mongoose.model('User', User);