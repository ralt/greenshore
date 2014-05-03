CREATE TABLE project (
    id serial PRIMARY KEY,
    name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE release (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    type integer NOT NULL,
    projectid integer references project(id) NOT NULL
);

CREATE TABLE server (
    id serial PRIMARY KEY,
    hostname varchar(255) NOT NULL,
    port integer NOT NULL
);

CREATE TABLE project_server (
    projectid integer references project(id),
    serverid integer references server(id),
    PRIMARY KEY(projectid, serverid)
);
