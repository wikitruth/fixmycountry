'use strict';

var mongoose    = require('mongoose'),
    utils       = require('../utils/utils'),
    flowUtils   = require('../utils/flowUtils'),
    paths       = require('../models/paths'),
    templates   = require('../models/templates'),
    db          = require('../app').db.models;

function createModel() {
    return {};
}

module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = createModel();
        db.Incident.find({}).limit(100).sort({ title: 1 }).exec(function(err, results) {
            results.forEach(function(result) {
                result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
            });
            model.incidents = results;
            res.render(templates.incidents.index, model);
        });
    });

    // item details
    router.get('/entry', function (req, res) {
        var model = createModel();
        flowUtils.setIncidentModel(req, model, function (err) {
            res.render(templates.incidents.entry, model);
        });
    });

    router.get('/create', function (req, res) {
        var model = createModel();
        flowUtils.setIncidentModel({query:{incident:req.query.id}}, model, function (err) {
            res.render(templates.incidents.create, model);
        });
    });

    router.post('/create', function (req, res) {
        var query = {
            _id: req.query.id ? req.query.id : new mongoose.Types.ObjectId()
        };
        db.Incident.findOne(query, function(err, result) {
            var entity = result ? result : {};
            entity.title = req.body.title;
            entity.content = req.body.content;
            entity.references = req.body.references;
            entity.editUserId = req.user.id;
            entity.editDate = Date.now();
            if(!result) {
                entity.createUserId = req.user.id;
                entity.createDate = Date.now();
            }
            db.Incident.update(query, entity, {upsert: true}, function(err, writeResult) {
                if (err) {
                    throw err;
                }
                if(result) {
                    res.redirect(paths.incidents.entry + '?incident=' + req.query.id);
                } else if(req.query.incident) {
                    res.redirect(paths.incidents.index + '?incident=' + req.query.incident);
                } else {
                    res.redirect(paths.incidents.index);
                }
            });
        });
    });
};
