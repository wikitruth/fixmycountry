'use strict';

var mongoose    = require('mongoose'),
    async       = require('async'),
    utils       = require('../../utils/utils'),
    flowUtils   = require('../../utils/flowUtils'),
    constants   = require('../../models/constants'),
    paths       = require('../../models/paths'),
    templates   = require('../../models/templates'),
    db          = require('../../app').db.models;

function setItemModel(req, model, callback) {
    if(req.query.id) {
        db.Organization.findOne({_id: req.query.id}, function (err, result) {
            model.organization = result;
            flowUtils.appendOwnerFlag(req, result, model);
            callback();
        });
    } else {
        callback();
    }
}

function createModel() {
    return {};
}

function setItemModels(req, model, callback) {
    if(req.query.id) {
        async.series({
            organization: function (callback) {
                setItemModel(req, model, callback);
            },
            parentOrganization: function (callback) {
                if(model.organization && model.organization.parentId) {
                    db.Organization.findOne({_id: model.organization.parentId}, function (err, result) {
                        if (result) {
                            model.parentOrganization = result;
                        }
                        callback();
                    });
                } else {
                    callback();
                }
            }
        }, function (err, results) {
            callback();
        });
    } else {
        callback();
    }
}

module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = createModel();
        async.parallel({
            organization: function(callback){
                setItemModels(req, model, callback);
            },
            organizations: function(callback) {
                var query = req.query.id ? { parentId: req.query.id } : { parentId: null};
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
                setItemModels(req, model, callback);
            },
            organizations: function(callback) {
                // display top sub-organizations
                db.Organization.find({ parentId: req.query.id }).limit(15).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.organizations = results;
                    callback();
                });
            },
            branches: function(callback) {
                // display top sub-branches
                db.Branch.find({ organizationId: req.query.id }).limit(15).sort({ title: 1 }).exec(function(err, results) {
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
                if(req.query._id) {
                    db.Organization.findOne({_id: req.query._id}, function (err, result) {
                        model.organization = result;
                        callback();
                    });
                } else {
                    callback();
                }
            },
            parentOrganization: function(callback) {
                var query = {
                    _id: req.query.id ? req.query.id : model.organization && model.organization.parentId ? model.organization.parentId : null
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
            _id: req.query._id ? req.query._id : new mongoose.Types.ObjectId()
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
                    res.redirect(paths.organizations.entry + '?id=' + req.query._id);
                } else if(req.query.id) {
                    res.redirect(paths.organizations.index + '?id=' + req.query.id);
                } else {
                    res.redirect(paths.organizations.index);
                }
            });
        });
    });
};
