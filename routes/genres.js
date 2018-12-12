const validateObjectId = require('../middleware/validateObjectId.js')
const auth = require('../middleware/auth');
const {Genre, validate} = require('../models/genre');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre with Id is not find');
  }
  res.send(genre);
});

router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const genre = new Genre({
    name: req.body.name
  });

  await genre.save();
  res.send(genre);
});

router.delete('/:id', auth, async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) {
    return res.status(404).send('The genre with the given ID');
  }
  res.send(genre);
});

module.exports = router;