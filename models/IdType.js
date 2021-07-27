const mongoose = require("mongoose");

const IdType = new mongoose.Schema({
    value: {type: String, unique: true, default: "email"},
});

module.exports = mongoose.model('IdType', IdType);