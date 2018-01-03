'use strict';

var async       = require('async'),
    templates   = require('../models/templates'),
    constants   = require('../models/constants'),
    //flowUtils   = require('../utils/flowUtils'),
    db          = require('../app').db.models;

module.exports = function (router) {
    var model = {};

    router.get('/', function (req, res) {
        res.render(templates.index, model);
    });

    router.get('/details/:entity', function (req, res) {
        var id = req.query.id;
        var entityType = req.params.entity.toLowerCase();

        if(!id || !entityType) {
            model.entity = {
                type: 'Not found',
                title: 'Not found'
            };
            res.render(templates.details, model);
            return;
        }

        var entity = {
            id: id,
            type: constants.OBJECT_TYPE_NAMES[entityType]
        };

        async.parallel([
            function(callback){
                if(entityType === 'person') {
                    db.Person.findOne({_id: id}, function (err, result) {
                        entity.createDate = result.createDate;
                        entity.title = result.getFullName();
                        entity.editDate = result.editDate;
                        async.parallel([
                            function(callback){
                                if(result.editUserId) {
                                    db.User.findOne({_id: result.editUserId}, function (err, result) {
                                        entity.editUser = result.username;
                                        callback(err);
                                    });
                                } else {
                                    callback(err);
                                }
                            },
                            function(callback){
                                if(result.createUserId) {
                                    db.User.findOne({_id: result.createUserId}, function (err, result) {
                                        entity.createUser = result.username;
                                        callback(err);
                                    });
                                } else {
                                    callback(err);
                                }
                            }
                        ],
                        function(err, results){
                            callback(err);
                        });
                    });
                } else {
                    callback();
                }
            },
            function(callback){
                if(entityType === 'organization') {
                    callback();
                } else {
                    callback();
                }
            },
            function(callback){
                if(entityType === 'branch') {
                    callback();
                } else {
                    callback();
                }
            },
            function(callback){
                if(entityType === '') {
                    callback();
                } else {
                    callback();
                }
            }
        ],
        function(err, results){
            model.entity = entity;
            res.render(templates.details, model);
        });
    });
};
