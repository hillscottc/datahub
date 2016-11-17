import knex from 'knex';
import bookshelf from 'bookshelf';

// Can't use config values here.
// import config  from '../config';

const Bookshelf = bookshelf(knex(
  // {client: 'pg', connection: process.env.DATABASE_URL || 'postgres:///hills120' }
  {client: 'pg', connection: process.env.DATABASE_URL || 'postgres:///triv_db' }
));

export default Bookshelf;
