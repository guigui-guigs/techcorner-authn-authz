const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    federatedId: {type: String, required: true, unique: true},
    viewer: {type: Boolean, required: true},
    editor: {type: Boolean, required: true},
    admin: {type: Boolean, required: true}
},{collection: 'users'});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);