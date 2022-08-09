const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const resourceSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true}
},{collection: 'resources'});

module.exports = mongoose.model('Resource', resourceSchema);