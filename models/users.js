const mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const userModel = mongoose.model('users', usersSchema);

module.exports = userModel;

console.log('====== "userModel" export done')