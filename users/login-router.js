const express = require('express')
const bcrypt = require('bcrypt')
const dbHelpers = require('./users-model')

const router = express.Router();

router.post('/', (req, res) => {
  let { username, password } = req.body;
  dbHelpers.getCurrentUser({ username })
    .first()
    .then(user => {
      console.log(user)
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}` })
      } else {
        res.status(401).json({ message: "You shall not pass" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})







module.exports = router;