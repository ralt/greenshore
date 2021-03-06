var release = require('../entities/release');

exports.addGet = function(req, res) {
    res.render('release/add', {
        title: 'Create new release',
        projectid: req.query.projectid
    });
};

exports.addPost = function(req, res) {
    release.add({
        name: req.body.name,
        projectid: req.body.projectid
    }).then(function(releaseid) {
        res.redirect('/release/' + releaseid);
    });
};

exports.getOne = function(req, res) {
    release.getOne(req.params.id).then(function(release) {
        res.render('release/release', {
            title: release.name,
            release: release,
            projectid: release.projectid
        });
    });
};
