'use strict';

module.exports = function (router) {
    var model = {};

    router.get('/', function (req, res) {
        res.render('dust/index', model);
    });

    router.get('/people', function (req, res) {
        res.render('dust/people/index', model);
    });

    router.get('/events', function (req, res) {
        res.render('dust/events/index', model);
    });

    router.get('/projects', function (req, res) {
        res.render('dust/projects/index', model);
    });

    router.get('/government', function (req, res) {
        res.render('dust/government/index', model);
    });
};
