'use strict';

var _schema = require('../database/trivia/schema');

var limit = 3;
var offset = 0;
var cat_id = 307;
var clue_id = 1633;

_schema.Category.forge().query(function (qb) {
  qb.limit(1);
  // qb.join('trivia.category', 'clue.category_id', 'category.id');
})
// .fetchPage({limit, offset})
// .fetchAll()
.fetch({ withRelated: ['clues'] }).then(function (items) {

  console.log(items.toJSON());
}).catch(function (err) {
  console.error(err);
});