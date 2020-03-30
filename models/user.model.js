var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String, 
    phone: String,
    emai: String,
    password: String,
    avatar: String,
    regency: String
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = User;