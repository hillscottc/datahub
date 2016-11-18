import config from '../config';
import knex from 'knex';
import bookshelf from 'bookshelf';

const Bookshelf = bookshelf(
  knex({client: 'pg', connection: config.databaseUrl }));

export default Bookshelf;
