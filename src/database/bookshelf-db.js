import config from '../config';
import knex from 'knex';
import bookshelf from 'bookshelf';
import Promise from 'bluebird';

const Bookshelf = bookshelf(
  knex({
    client: 'pg',
    debug: 'true',
    connection: config.databaseUrl,
    // connection: {
    //   host: 'localhost',
    //   user: 'hills120',
    //   // password: settings.postgres.password,
    //   // database: settings.postgres.database,
    //   // port: settings.postgres.port
    // },
    // pool: {
    //   afterCreate: function (connection, callback) {
    //     Promise.promisify(connection.query,
    //       connection)("SET SESSION SCHEMA 'trivia';", []).then(function () {
    //       callback(null, connection);
    //     });
    //   }
    // }
  }));

export default Bookshelf;
