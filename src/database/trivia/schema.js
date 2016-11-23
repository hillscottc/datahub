import Bookshelf from './bookshelf-trivia';


Bookshelf.plugin('pagination');


export class Category extends Bookshelf.Model {

  get tableName() { return 'category'; }

  clues() {
    return this.hasMany(Clue);
  }

  // the app expects id to be called category_id
  static fixId({id, ...args}) {
    return {category_id: id, ...args};
  }

}


export class Clue extends Bookshelf.Model {

  get tableName() { return 'clue'; }

  category() {
    return this.belongsTo(Category);
  }

  // the app expects id to be called clue_id
  static fixId({id, ...args}) {
    return {clue_id: id, ...args};
  }

}

