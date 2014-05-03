Exec { path => [ '/bin/', '/sbin/' , '/usr/bin/', '/usr/sbin/' ] }

class system-update {
    exec { 'apt-get update':
        command => 'apt-get update',
    }
}

class nodejs-ppa {
    include apt

    apt::ppa { 'ppa:chris-lea/node.js': }
}

class nodejs {
    include system-update
    include nodejs-ppa

    package { 'nodejs':
        ensure => present,
        require => Class['nodejs-ppa', 'system-update']
    }
}

class { 'postgresql::globals':
    version => '9.3',
    manage_package_repo => true
}

postgresql::server::pg_hba_rule { 'allow anyone to use greenshore':
    type => 'local',
    database => 'greenshore',
    user => 'greenshore_user',
    auth_method => 'md5'
}

class postgres {
    include postgresql::server

    postgresql::server::db { 'greenshore':
        user => 'greenshore_user',
        password => postgresql_password('greenshore_user', 'password')
    }

}

class postgres-dev {
    package { 'postgresql-server-dev-9.3':
        ensure => present,
        require => Class['init_db']
    }
}

class init_db {
    exec { 'create db structure':
        environment => [ 'PGPASSWORD=password' ],
        command => 'psql -h localhost -U greenshore_user -d greenshore -a -f /vagrant/sql/base.sql',
        require => Class['postgres']
    }
}

class init_greenshore {
    include postgres-dev

    exec { 'npm install':
        path => ['/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/', '/usr/local/bin/'],
        command => '/bin/bash -c "cd /vagrant/; npm install"',
        require => Class['nodejs', 'postgres', 'postgres-dev']
    }
}

include nodejs
include postgres
include redis
include init_db
include init_greenshore
