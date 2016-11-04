const config = require('../config');

const knex = require('knex')({client: 'pg', connection: 'postgres:///hills120'});

module.exports = require('bookshelf')(knex);
