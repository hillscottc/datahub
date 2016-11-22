import Bookshelf from './bookshelf-db';

Bookshelf.plugin('pagination');

export class Category extends Bookshelf.Model {

  get tableName() { return 'category'; }

  clues() {
    return this.hasMany(Clue);
  }

}

export class Clue extends Bookshelf.Model {

  get tableName() { return 'clue'; }

  category() {
    return this.belongsTo(Category);
  }

}

