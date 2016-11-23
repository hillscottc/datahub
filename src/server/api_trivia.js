/**
 * Server routes at /trivia/
 */
import {Clue, Category} from '../database/trivia/schema';
import express from 'express';
import pg from 'pg';
import config from '../config';

const router = express.Router();


// GET /api/clues -- RANDOM clues with optional limit (10)
router.get('/clues/:limit?', (req, res) => {
  const {limit=10} = req.params;
  const results = [];
  pg.connect(config.databaseUrl, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    // join with category name
    const query = client.query(
      "SELECT clue.id AS clue_id, category.category_name AS category, clue.question, clue.answer FROM trivia.clue " +
      "JOIN trivia.category ON category.id = clue.category_id " +
      "ORDER BY random() LIMIT " + limit + ";");

    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });



});


// GET /api/clues/cat/{id} -- clues by cat id
router.get('/clues/cat/:id', (req, res) => {
  const id = +req.params.id;
  const results = [];
  pg.connect(config.databaseUrl, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    const query = client.query(
      "SELECT clue.id AS clue_id, category.category_name AS category, clue.question, clue.answer FROM trivia.clue " +
      "JOIN trivia.category ON category.id = clue.category_id " +
      "WHERE clue.category_id = $1;", [id]);
    query.on('row', (row) => {
      results.push(row);
    });
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });
});


// GET /api/cats -- RANDOM categories
router.get('/cats/:limit?', (req, res) => {
  const {limit=10} = req.params;
  const results = [];
  pg.connect(config.databaseUrl, (err, client, done) => {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    // const query = client.query("SELECT * FROM trivia.category ORDER BY random() LIMIT " + limit + ";");
    const query = client.query(
      "SELECT id as category_id, category_name FROM trivia.category " +
      "ORDER BY random() LIMIT " + limit + ";");
    query.on('row', (row)  =>{
      results.push(row);
    });
    query.on('end', ()  =>{
      done();
      return res.json(results);
    });
  });
});


module.exports = router;
