const db = require('../data/dbconfig.js');

function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => id);
}

function find() {
  return db('users');
}

function findBy(where) {
  return db('users').where(where);
}

function findByUsername(username) {
  return findBy({ username }).first();
}

module.exports = {
  insert,
  find,
  findBy,
  findByUsername
}