'use strict';
const Hapi = require('hapi');
const MySQL = require('mysql');

// Create a server with a host and port
const server = new Hapi.Server();

const connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'Initial@1',
     database: 'yelodb'
});

server.connection({
    host: 'localhost',
    port: 8000
});

connection.connect();

server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
       connection.query('SELECT user_id, name, email FROM user',
       function (error, results, fields) {
       if (error) throw error;

       reply(results);
    });
  }
});


// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});