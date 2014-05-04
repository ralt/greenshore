var db = require('./postgresql');

exports.add = function(server) {
    return db.connect().then(function() {
        return this.client.queryAsync(
            'INSERT INTO server (hostname, port) VALUES ($1, $2) RETURNING id',
            [server.hostname, server.port]
        );
    }).then(function(res) {
        return this.client.queryAsync(
            'INSERT INTO project_server (projectid, serverid) VALUES ($1, $2) RETURNING serverid',
            [server.projectid, res.rows[0]]
        );
    }).get('rows').get(0);
};

exports.getOne = function(id) {
    return db.connect().then(function() {
        return this.client.queryAsync({
            name: 'server_all',
            text: 'SELECT * FROM server WHERE id = $1',
            values: [id]
        });
    }).get('rows').get(0);
};
