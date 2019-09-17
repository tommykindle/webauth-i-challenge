const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        console.log(error)
        res.status(500).json({ message: 'You cannot log out' })
      } else {
        res.status(200).json({ message: 'thank you for visiting' })
      }
    })
  } else {
    res.status(200).json({ message: 'already logged out' })
  }
})









module.exports = router;