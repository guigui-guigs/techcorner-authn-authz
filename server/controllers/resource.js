const Resource = require('../models/Resource');

exports.createresource = (req, res, next) => {
    try {
        const newresource = new Resource({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
        });
        newresource.save()
            .then(() => res.status(200).json({message: 'Resource successfully created'}))
            .catch(error => res.status(400).json({error}));
    } catch (error) {
        res.status(400).json({error});
    }
};

exports.editresource = (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({error});
    }
};

exports.deleteresource = (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({error});
    }
};

exports.allresourcesoverview = (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({error});
    }
};

exports.resourceoverviewbyid = (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({error});
    }
};

exports.resourcecontentbyid = (req, res, next) => {
    try {

    } catch (error) {
        res.status(400).json({error});
    }
};