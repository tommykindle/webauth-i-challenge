const express = require('express')
const bcrypt = require('bcrypt')
const dbHelpers = require('./users-model')
const restricted = require('../auth/restricted-middleware')
const router = express.Router();

router.get('/', restricted, (req, res) => {
  dbHelpers.getUsers()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.send(err);
    })
})











module.exports = router;