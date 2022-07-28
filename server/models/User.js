const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    federatedId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    accessContent: {type: Boolean, required: true}
},{collection: 'TechCorner'});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);