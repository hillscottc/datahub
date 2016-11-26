import {Clue, Category} from '../database/trivia/schema';


const limit = 3;
const offset = 0;
const cat_id = 307;
const clue_id = 1633;


Category.forge()
  .query((qb) => {
    qb.limit(1);
    // qb.join('trivia.category', 'clue.category_id', 'category.id');
  })
  // .fetchPage({limit, offset})
  // .fetchAll()
  .fetch({withRelated: ['clues']})
  .then((items) => {

    console.log(items.toJSON());

  })
  .catch((err) => {
    console.error(err)
  });
