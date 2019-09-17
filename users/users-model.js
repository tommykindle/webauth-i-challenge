const db = require('../data/dbConfig')

module.exports = {
  addUser,
  getUsers,
  getCurrentUser,
  getUserById,

}
// create new user
function addUser(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return getUserById(id)
    })
}
// get all users
function getUsers() {
  return db('users')
    .select('id', 'username', 'password')
}
// get current user
function getCurrentUser(filter) {
  return db('users')
    .where((filter))
}
function getUserById(id) {
  return db('users')
    .where({ id }).first()
}
