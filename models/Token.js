const mongoose = require("mongoose");

const Token = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    refreshTokens: [{type: String, required: true}]
});

module.exports = mongoose.model('Token', Token);