const config = require('../config');

const knex = require('knex')({client: 'pg', connection: 'postgres:///datahub'});

module.exports = require('bookshelf')(knex);
