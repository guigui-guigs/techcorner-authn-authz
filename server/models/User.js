const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    federatedId: {type: String, required: true, unique: true},
    googleId: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    accessContent: {type: Boolean, required: true},
    admin: {type: Boolean, required: true},
    password: {type: String, required: false}
},{collection: 'users'});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);