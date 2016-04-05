'use strict';

var db      = require('../app').db.models,
    async   = require('async');

function isOwner(req, item, model) {
    if(item && req.user && item.createUserId && req.user.id && item.createUserId.equals(req.user.id)) {
        return true;
    }
    return false;
}

function appendOwnerFlag(req, item, model) {
    if(isOwner(req, item, model)) {
        model.isItemOwner = true;
    }
}

function setPersonModel(req, model, callback) {
    if(req.query.person) {
        db.Person.findOne({_id: req.query.person}, function (err, result) {
            model.person = result;
            if(isOwner(req, result, model)) {
                model.isPersonOwner = true;
            }
            callback(err);
        });
    } else {
        callback();
    }
}

function setIncidentModel(req, model, callback) {
    if(req.query.incident) {
        db.Incident.findOne({_id: req.query.incident}, function (err, result) {
            model.incident = result;
            if(isOwner(req, result, model)) {
                model.isIncidentOwner = true;
            }
            callback(err);
        });
    } else {
        callback();
    }
}

function setProjectModel(req, model, callback) {
    if(req.query.project) {
        db.Project.findOne({_id: req.query.project}, function (err, result) {
            model.project = result;
            if(isOwner(req, result, model)) {
                model.isProjectOwner = true;
            }
            callback(err);
        });
    } else {
        callback();
    }
}

function setOrganizationModel(req, model, callback) {
    if(req.query.organization) {
        db.Organization.findOne({_id: req.query.organization}, function (err, result) {
            model.organization = result;
            if(isOwner(req, result, model)) {
                model.isOrganizationOwner = true;
            }
            callback(err);
        });
    } else {
        callback();
    }
}

function setOrganizationModels(req, model, callback) {
    if(req.query.organization) {
        async.series({
            organization: function (callback) {
                setOrganizationModel(req, model, callback);
            },
            parentOrganization: function (callback) {
                if(model.organization && model.organization.parentId) {
                    db.Organization.findOne({_id: model.organization.parentId}, function (err, result) {
                        if (result) {
                            model.parentOrganization = result;
                        }
                        callback(err);
                    });
                } else {
                    callback();
                }
            }
        }, function (err, results) {
            callback(err);
        });
    } else {
        callback();
    }
}

function setBranchModels(req, model, callback) {
    if(req.query.branch) {
        async.series({
            branch: function (callback) {
                db.Branch.findOne({_id: req.query.branch}, function (err, result) {
                    model.branch = result;
                    if(isOwner(req, result, model)) {
                        model.isBranchOwner = true;
                    }
                    callback(err);
                });
            },
            parentBranch: function (callback) {
                if(model.branch && model.branch.parentId) {
                    db.Branch.findOne({_id: model.branch.parentId}, function (err, result) {
                        if (result) {
                            model.parentBranch = result;
                        }
                        callback(err);
                    });
                } else {
                    callback();
                }
            }
        }, function (err, results) {
            callback(err);
        });
    } else {
        callback();
    }
}

module.exports = {
    isOwner: isOwner,
    appendOwnerFlag: appendOwnerFlag,
    setPersonModel: setPersonModel,
    setIncidentModel: setIncidentModel,
    setProjectModel: setProjectModel,
    setOrganizationModel: setOrganizationModel,
    setOrganizationModels: setOrganizationModels,
    setBranchModels: setBranchModels
};