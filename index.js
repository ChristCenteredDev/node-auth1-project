const express = require('express');
const server = express();
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/dbconfig.js');

const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'test secret',
  name: 'Cookie',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    httpOnly: true 
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30,
  }),
};

server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

const authRouter = require('./auth/auth-router.js');
server.use('/api', authRouter);
const usersRouter = require('./users/users-router.js');
server.use('/api', usersRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server on port: ${port}`));