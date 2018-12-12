const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const users = await User.find().sort('name').select('-password');
  res.send(users);
});

router.get('/:id', auth, async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({email: req.body.email}); // if it is register with this email return error
  
  if (user) {
    return res.status(400).send('User already register');
  }

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID not found');

  res.send(user);
});

module.exports = router;