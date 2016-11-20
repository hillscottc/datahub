/**
 * Server routes at /api/
 */
import {Plant} from '../database/plants-schema';
import {Clue} from '../database/trivia-schema';
import express from 'express';

const router = express.Router();


// GET clues all
router.get('/clues/', (req, res) => {

  const {limit=10, offset=0} = req.query;

  Clue.forge()
    .fetchPage({limit, offset})
    .then((clues) => {
      return res.json({
        data: clues.toJSON(),
        pagination: clues.pagination
      })
    })
    .catch((err) => {
      return res.status(500).json({error: true, data: {message: err.message}});
    });
});


// GET plants all
router.get('/plants/', (req, res) => {

  const {family, common, symbol, sci, limit, offset} = req.query;

  Plant.forge()
      .query((qb) => {
        //qb is knex query builder
        Plant.setPlantsQuery(qb, {family, common, symbol, sci});
      })
      .fetchPage({limit, offset})
      .then((plants) => {
        return res.json({
          data: plants.toJSON(),
          pagination: plants.pagination
        })
      })
      .catch((err) => {
        return res.status(500).json({error: true, data: {message: err.message}});
      });
});


// POST QUERY
// Accepts post of search args to return plant records.
router.post('/plants/', (req, res) => {

  const {family, common, symbol, sci, limit, offset} = req.body;

  Plant.forge()
      .query((qb) => {
        //qb is knex query builder
        Plant.setPlantsQuery(qb, {family, common, symbol, sci});
      })
      .fetchPage({limit, offset})
      .then((plants) => {
        return res.json({
          data: plants.toJSON(),
          pagination: plants.pagination
        })
      })
      .catch((err) => {
        return res.status(500).json({error: true, data: {message: err.message}});
      });

});


module.exports = router;
