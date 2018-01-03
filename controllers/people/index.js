'use strict';

var mongoose    = require('mongoose'),
    utils       = require('../../utils/utils'),
    flowUtils   = require('../../utils/flowUtils'),
    paths       = require('../../models/paths'),
    templates   = require('../../models/templates'),
    constants   = require('../../models/constants'),
    db          = require('../../app').db.models;

module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = {};
        model.listView = true;
        db.Person.find({}).limit(100).sort({ lastName: 1 }).exec(function(err, results) {
            results.forEach(function(result) {
                result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
            });
            model.persons = results;
            res.render(templates.people.index, model);
        });
    });

    // item details
    router.get('/entry', function (req, res) {
        var model = {};
        flowUtils.setPersonModel(req, model, function (err) {
            // Top Arguments
            var query = {ownerId: req.query.person, ownerType: constants.OBJECT_TYPES.person};
            db.Argument.find(query).limit(15).sort({ title: 1 }).exec(function(err, results) {
                results.forEach(function(result) {
                    result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                });
                model.arguments = results;
                res.render(templates.people.entry, model);
            });
        });
    });

    router.get('/create', function (req, res) {
        var model = {};
        flowUtils.setPersonModel({query:{person:req.query.id}}, model, function (err) {
            res.render(templates.people.create, model);
        });
    });

    router.post('/create', function (req, res) {
        var query = {
            _id: req.query.id ? req.query.id : new mongoose.Types.ObjectId()
        };
        db.Person.findOne(query, function(err, result) {
            var entity = result ? result : {};
            entity.content = req.body.content;
            entity.title = req.body.title;
            entity.firstName = req.body.firstName;
            entity.lastName = req.body.lastName;
            entity.references = req.body.references;
            entity.editUserId = req.user.id;
            entity.editDate = Date.now();
            if(!result) {
                entity.createUserId = req.user.id;
                entity.createDate = Date.now();
            }
            db.Person.update(query, entity, {upsert: true}, function(err, writeResult) {
                if (err) {
                    throw err;
                }
                if(result) {
                    res.redirect(paths.people.entry + '?person=' + req.query.id);
                } else {
                    res.redirect(paths.people.index + (req.query.person ? '?person=' + req.query.person : ''));
                }
            });
        });
    });
};
