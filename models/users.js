const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    username: String,
    email: String,
    sel: String,
    password: String,
    token: String,
});

const userModel = mongoose.model('users', usersSchema);

module.exports = userModel;

console.log('====== "userModel" export done')