const express = require('express');
const server = express();
server.use(express.json());

const authRouter = require('./auth/auth-router.js');
server.use('/api', authRouter);
const usersRouter = require('./users/users-router.js');
server.use('/api', usersRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server on port: ${port}`));