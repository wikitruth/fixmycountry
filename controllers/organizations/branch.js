'use strict';

var utils       = require('../../utils/utils'),
    flowUtils   = require('../../utils/flowUtils'),
    mongoose    = require('mongoose'),
    constants   = require('../../models/constants'),
    async       = require('async'),
    paths       = require('../../models/paths'),
    templates   = require('../../models/templates'),
    db          = require('../../app').db.models;

function createModel() {
    return {};
}

module.exports = function (router) {

    router.get('/', function (req, res) {
        var model = createModel();
        if(req.query.organization) {
            flowUtils.setOrganizationModels(req, model, function () {
                flowUtils.setBranchModels(req, model, function() {
                    var query = {
                        organizationId: model.organization._id,
                        parentId: model.branch ? model.branch._id : null
                    };
                    db.Branch.find(query).limit(15).sort({ title: 1 }).exec(function(err, results) {
                        results.forEach(function(result) {
                            result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                        });
                        model.branches = results;
                        res.render(templates.organizations.branch.index, model);
                    });
                });
            });
        } else {
            // Top Discussions
            db.Branch.find({ organizationId: null }).limit(100).exec(function(err, results) {
                results.forEach(function(result) {
                    result.organizationId = {
                        _id: result.organizationId
                    };
                    result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                });
                model.branches = results;
                res.render(templates.organizations.branch.index, model);
            });
        }
    });

    router.get('/entry', function (req, res) {
        var model = createModel();
        flowUtils.setOrganizationModels(req, model, function () {
            flowUtils.setBranchModels(req, model, function () {
                // display top sub-branches
                db.Branch.find({ organizationId: req.query.organization, parentId: req.query.branch }).limit(15).sort({ title: 1 }).exec(function(err, results) {
                    results.forEach(function(result) {
                        result.comments = utils.numberWithCommas(utils.randomInt(1,100000));
                    });
                    model.branches = results;
                    res.render(templates.organizations.branch.entry, model);
                });
            });
        });
    });

    router.get('/create', function (req, res) {
        var model = createModel();
        flowUtils.setOrganizationModels(req, model, function () {
            async.series({
                branch: function(callback){
                    flowUtils.setBranchModels({query:{branch:req.query.id}}, model, callback);
                },
                parentBranch: function(callback) {
                    var query = {
                        _id: req.query.branch ? req.query.branch : model.branch && model.branch.parentId ? model.branch.parentId : null
                    };
                    if(query._id) {
                        db.Branch.findOne(query, function (err, result) {
                            model.parentBranch = result;
                            callback();
                        });
                    } else {
                        callback();
                    }
                }
            }, function (err, results) {
                res.render(templates.organizations.branch.create, model);
            });

            /*
            setBranchModel(req, model, function () {
                res.render(templates.organizations.branch.create, model);
            });*/
        });
    });

    router.post('/create', function (req, res) {
        var query = { _id: req.query.id ? req.query.id : new mongoose.Types.ObjectId() };
        db.Branch.findOne(query, function(err, result) {
            var entity = result ? result : {};
            entity.content = req.body.content;
            entity.title = req.body.title;
            entity.editUserId = req.user.id;
            entity.editDate = Date.now();
            entity.parentId = req.body.parent ? req.body.parent : null;
            if(!result) {
                entity.createUserId = req.user.id;
                entity.createDate = Date.now();
            }
            if(!entity.organizationId && req.query.organization) {
                entity.organizationId = req.query.organization;
            }
            db.Branch.update(query, entity, {upsert: true}, function(err, writeResult) {
                if (err) {
                    throw err;
                }
                if(req.query.id || req.query.branch) {
                    res.redirect(paths.organizations.branch.entry + '?organization=' + req.query.organization + '&branch=' + (req.query.id ? req.query.id : req.query.branch));
                } else {
                    res.redirect(paths.organizations.branch.index + '?organization=' + req.query.organization);
                }
            });
        });
    });
};
