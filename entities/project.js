var db = require('./postgresql');

exports.getProjects = function() {
    return db.connect().then(function() {
        return this.client.queryAsync('SELECT * FROM project');
    }).get('rows');
};

exports.add = function(project) {
    return db.connect().then(function() {
        return this.client.queryAsync(
            'INSERT INTO project (name) VALUES ($1) RETURNING id',
            [project.name]
        );
    }).get('rows').get(0);
};

exports.getOne = function(id) {
    return db.connect().then(function() {
        return this.client.queryAsync({
            name: 'project_all',
            text: 'SELECT * FROM project WHERE id = $1',
            values: [id]
        });
    }).get('rows').get(0);
};

exports.getReleases = function(id) {
    return db.connect().then(function() {
        return this.client.queryAsync({
            name: 'project_releases',
            text: 'SELECT * FROM release WHERE projectid = $1',
            values: [id]
        });
    }).get('rows');
};

exports.getReleasesCount = function(id) {
    return db.connect().then(function() {
        return this.client.queryAsync({
            name: 'project_releases_count',
            text: 'SELECT COUNT(*) FROM release WHERE projectid = $1',
            values: [id]
        });
    }).get('rows').get(0);
};
