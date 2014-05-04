var server = require('../entities/server');

exports.addGet = function(req, res) {
    res.render('server/add', {
        title: 'Create new server',
        projectid: req.query.projectid
    });
};

exports.addPost = function(req, res) {
    server.add({
        hostname: req.body.hostname,
        port: req.body.port,
        projectid: req.body.projectid
    }).then(function(serverid) {
        res.redirect('/server/' + serverid);
    });
};

exports.getOne = function(req, res) {
    server.getOne(req.params.id).spread(function(server) {
        res.render('server/server', {
            title: server.hostname,
            server: server,
            projectid: server.projectid
        });
    });
};
