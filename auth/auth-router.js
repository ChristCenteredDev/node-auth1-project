const router = require('express').Router();
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const bcrypt = require('bcryptjs');

  Users.insert({ username, password: bcrypt.hashSync(password, 8) })
    .then(id => {
      res.status(201).json({ message: 'User registered', id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error registering user'});
    })
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const bcrypt = require('bcryptjs'); 

  Users
  .findByUsername(username)
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ message: 'User logged in' });
    } else {
      res.status(401).json({ errorMessage: 'User credentials failed' });
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'Error registering user'});
    })
});



module.exports = router;