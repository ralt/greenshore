var project = require('../entities/project');
var Promise = require('bluebird');

exports.index = function(req, res) {
    project.getProjects().then(function(projects) {
        render.
        res.render('project/index', {
            title: 'Projects',
            projects: projects
        });
    });
};

exports.addGet = function(req, res) {
    res.render('project/add', {
        title: 'Create new project',
    });
};

exports.addPost = function(req, res) {
    project.add({ name: req.body.name }).then(function(project) {
        res.redirect('/project/' + project.id);
    });
};

exports.getOne = function(req, res) {
    Promise.all([
        project.getOne(req.params.id),
        project.getReleases(req.params.id),
        project.getServers(req.params.id)
    ]).spread(function(project, releases, servers) {
        res.render('project/project', {
            title: project.name,
            project: project,
            releases: releases,
            servers: servers
        });
    });
};
