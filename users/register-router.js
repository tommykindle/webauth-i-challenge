const express = require('express')
const bcrypt = require('bcrypt')
const dbHelpers = require('./users-model')

const router = express.Router()


router.post('/', (req, res) => {
  let { username, password } = req.body
  const hash = bcrypt.hashSync(password, 16)
  dbHelpers.addUser({ username, password: hash })
    .then(saved => {
      console.log(saved)
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})



module.exports = router;