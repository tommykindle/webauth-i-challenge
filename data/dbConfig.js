const knex = require('knex')

const knexConfig = require('../knexfile')

module.exports = knexConfig(knexConfig.development);