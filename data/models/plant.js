import Bookshelf from '../bookshelf-db';


Bookshelf.plugin('pagination');


class Plant extends Bookshelf.Model {

  get tableName() { return 'plant'; }

}

export default Plant;


