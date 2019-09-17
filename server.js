const express = require('express')
const userRouter = require('./users/user-router')
const loginRouter = require('./users/login-router')
const registerRouter = require('./users/register-router')
const logoutRouter = require('./users/logout-router')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session)
const dbConnection = require('./data/dbConfig')
const server = express()

server.use(express.json())

const sessionConfig = {
  name: 'cookiemonster',
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30
  })
}
server.use(session(sessionConfig))
server.use('/api/users', userRouter)
server.use('/api/login', loginRouter)
server.use('/api/register', registerRouter)
server.use('/api/logout', logoutRouter)



module.exports = server