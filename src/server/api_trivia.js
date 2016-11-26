/**
 * Server routes at /trivia/
 */
import {Clue, Category} from '../database/trivia/schema';
import express from 'express';

const router = express.Router();


// GET /api/clues -- RANDOM clues with optional limit (10)
router.get('/clues/:limit?', (req, res) => {
  const limit = +req.params.limit || 10;

  Clue.forge()
    .query((qb) => {
      qb.limit(limit);
      qb.orderByRaw('random()');
    })
    .fetchAll()
    .then((clues) => {
      // fix it ... id -> clue_id
      return clues.models.map(clue => {
        return Clue.fixId(clue.attributes)
      });
    })
    .then((clues) => {
      return res.json(clues);
    })
    .catch((err) => {
      console.error(err);
      return res.json({});
    });

});


// GET /api/clues/cat/{id} -- clues by cat id
router.get('/clues/cat/:id', (req, res) => {
  const id = req.params.id;

  Category.forge({id})
    .fetch({withRelated: ['clues']})
    .then((cat) => {
      return cat.related('clues');
    })
    .then((clues) => {
      // fix it ... id -> clue_id
      return clues.models.map(clue => {
        return Clue.fixId(clue.attributes)
      });
    })
    .then((clues) => {
      return res.json(clues);
    })
    .catch((err) => {
      console.error(err);
      return res.json({});
    });

});


// GET /api/cats -- RANDOM categories
router.get('/cats/:limit?', (req, res) => {
  const {limit=10} = req.params;

  Category.forge()
    .query((qb) => {
      qb.limit(limit);
      qb.orderByRaw('random()');
    })
    .fetchAll()
    .then((cats) => {
      // fix it ... id -> clue_id
      return cats.models.map(cat => {
        return Category.fixId(cat.attributes)
      });
    })
    .then((cats) => {
      // clues.length.should.equal(10);
      return res.json(cats);
    })
    .catch((err) => {
      console.error(err);
      return res.json({});
    });

});


module.exports = router;
