const bcrypt = require('bcrypt')

const dbHelpers = require('../users/users-model')

module.exports = (req, res, next) => {
  let { username, password } = req.headers

  dbHelpers.getCurrentUser({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next()
      } else {
        res.status(401).json({ message: 'You shall not pass' })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}