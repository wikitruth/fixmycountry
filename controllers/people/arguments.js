'use strict';

var mongoose    = require('mongoose'),
    utils       = require('../../utils/utils'),
    flowUtils   = require('../../utils/flowUtils'),
    paths       = require('../../models/paths'),
    templates   = require('../../models/templates'),
    modelTypes  = require('../../models/constants').OBJECT_TYPES,
    db          = require('../../app').db.models;

module.exports = function (router) {

    /* Arguments */

    router.get('/', function (req, res) {
        var model = {};
        if(req.query.person) {
            flowUtils.setPersonModel(req, model, function () {
                db.Argument.find({ ownerId: model.person._id, ownerType: modelTypes.person }).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.arguments = results;
                    res.render(templates.people.arguments.index, model);
                });
            });
        } else {
            // Top Discussions
            db.Argument.find({ ownerType: modelTypes.person }).limit(100).exec(function(err, results) {
                results.forEach(function(result) {
                    result.person = {
                        _id: result.ownerId
                    };
                    result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                });
                model.arguments = results;
                res.render(templates.people.arguments.index, model);
            });
        }
    });

    router.get('/entry', function (req, res) {
        var model = {};
        flowUtils.setPersonModel(req, model, function () {
            flowUtils.setArgumentModel(req, model, function () {
                res.render(templates.people.arguments.entry, model);
            });
        });
    });

    router.get('/create', function (req, res) {
        var model = {};
        flowUtils.setPersonModel(req, model, function () {
            flowUtils.setArgumentModel(req, model, function () {
                res.render(templates.people.arguments.create, model);
            });
        });
    });

    router.post('/create', function (req, res) {
        var query = {
            _id: req.query.argument ? req.query.argument : new mongoose.Types.ObjectId()
        };
        db.Argument.findOne(query, function(err, result) {
            var entity = result ? result : {};
            entity.content = req.body.content;
            entity.title = req.body.title;
            entity.references = req.body.references;
            entity.editUserId = req.user.id;
            entity.editDate = Date.now();
            if(!result) {
                entity.createUserId = req.user.id;
                entity.createDate = Date.now();
            }
            if(!entity.ownerId) {
                if(req.query.person) { // parent is a person
                    entity.ownerId = req.query.person;
                    entity.ownerType = modelTypes.person;
                }
            }
            db.Argument.update(query, entity, {upsert: true}, function(err, writeResult) {
                if (err) {
                    throw err;
                }
                if(result) {
                    res.redirect(paths.people.arguments.entry + '?person=' + req.query.person + '&argument=' + req.query.argument);
                } else {
                    res.redirect(paths.people.arguments.index + '?person=' + req.query.person);
                }
            });
        });
    });
};
