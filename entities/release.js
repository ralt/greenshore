var db = require('./postgresql');

exports.add = function(release) {
    return db.connect().then(function() {
        return this.client.queryAsync(
            'INSERT INTO release (name, type, projectid) VALUES ($1, $2, $3)',
            [release.name, 0, release.projectid]
        );
    });
};

exports.getOne = function(id) {
    return db.connect().then(function() {
        return this.client.queryAsync({
            name: 'release_all',
            text: 'SELECT * FROM release WHERE id = $1',
            values: [id]
        });
    }).get('rows').get(0);
};
