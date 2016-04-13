'use strict';

var mongoose    = require('mongoose'),
    async       = require('async'),
    utils       = require('../../utils/utils'),
    flowUtils   = require('../../utils/flowUtils'),
    paths       = require('../../models/paths'),
    templates   = require('../../models/templates'),
    db          = require('../../app').db.models;

function createModel() {
    return {};
}

module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = createModel();
        async.parallel({
            organization: function(callback){
                flowUtils.setOrganizationModels(req, model, callback);
            },
            organizations: function(callback) {
                var query = req.query.organization ? { parentId: req.query.organization } : { parentId: null};
                db.Organization.find(query).limit(100).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.organizations = results;
                    callback();
                });
            }
        }, function (err, results) {
            res.render(templates.organizations.index, model);
        });
    });

    // item details
    router.get('/entry', function (req, res) {
        var model = createModel();
        async.parallel({
            organization: function(callback){
                flowUtils.setOrganizationModels(req, model, callback);
            },
            organizations: function(callback) {
                // display top sub-organizations
                db.Organization.find({ parentId: req.query.organization }).limit(15).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.organizations = results;
                    callback();
                });
            },
            branches: function(callback) {
                // display top sub-branches
                db.Branch.find({ organizationId: req.query.organization }).limit(15).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.branches = results;
                    callback();
                });
            }
        }, function (err, results) {
            res.render(templates.organizations.entry, model);
        });
    });

    router.get('/create', function (req, res) {
        var model = createModel();
        async.series({
            organization: function(callback){
                if(req.query.id) {
                    db.Organization.findOne({_id: req.query.id}, function (err, result) {
                        model.organization = result;
                        callback();
                    });
                } else {
                    callback();
                }
            },
            parentOrganization: function(callback) {
                var query = {
                    _id: req.query.organization ? req.query.organization : model.organization && model.organization.parentId ? model.organization.parentId : null
                };
                if(query._id) {
                    db.Organization.findOne(query, function (err, result) {
                        model.parentOrganization = result;
                        callback();
                    });
                } else {
                    callback();
                }
            }
        }, function (err, results) {
            res.render(templates.organizations.create, model);
        });
    });

    router.post('/create', function (req, res) {
        var query = {
            _id: req.query.id ? req.query.id : new mongoose.Types.ObjectId()
        };
        db.Organization.findOne(query, function(err, result) {
            var entity = result ? result : {};
            entity.content = req.body.content;
            entity.title = req.body.title;
            entity.editUserId = req.user.id;
            entity.editDate = Date.now();
            if(!result) {
                entity.createUserId = req.user.id;
                entity.createDate = Date.now();
            }
            entity.parentId = req.body.parent ? req.body.parent : null;
            db.Organization.update(query, entity, {upsert: true}, function(err, writeResult) {
                if (err) {
                    throw err;
                }
                if(result) {
                    res.redirect(paths.organizations.entry + '?organization=' + req.query.id);
                } else if(req.query.organization) {
                    res.redirect(paths.organizations.index + '?organization=' + req.query.organization);
                } else {
                    res.redirect(paths.organizations.index);
                }
            });
        });
    });
};
