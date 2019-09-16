const express = require('express')
const bcrypt = require('bcrypt')
const dbHelpers = require('./users-model')

const router = express.Router();

router.post('/', (req, res) => {
  let { username, password } = req.body;
  dbHelpers.getCurrentUser({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: `Welcome ${user.username}` })
      } else {
        res.status(401).json({ message: "You shall not pass" })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})







module.exports = router;