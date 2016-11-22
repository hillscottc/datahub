import config from '../config';
import knex from 'knex';
import bookshelf from 'bookshelf';


const Bookshelf = bookshelf(
  knex({
    client: 'pg',
    debug: 'true',
    connection: config.databaseUrl,
    pool: {
      min: 0,
      max: 10,
      afterCreate: function (conn, cb) {
        conn.query("SET SESSION SCHEMA 'trivia';", function (err) {
          cb(err, conn);
        });
      }
    }
  }));

export default Bookshelf;
