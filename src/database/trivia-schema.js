import Bookshelf from './bookshelf-db';

Bookshelf.plugin('pagination');

export class Category extends Bookshelf.Model {

  get tableName() { return 'trivia.category'; }

}

export class Clue extends Bookshelf.Model {

  get tableName() { return 'trivia.clue'; }

}

