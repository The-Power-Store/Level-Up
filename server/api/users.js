const router = require('express').Router();
const { User } = require('../db/models');
const { isLoggedIn, makeError, isAdmin } = require('./utils');

module.exports = router;

router.param('id', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (!user) res.sendStatus(404);
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.get('/:id', isLoggedIn, (req, res, next) => {
  if (req.requestedUser) {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(next);
  } else next(makeError(403, 'Forbidden'));
});

router.delete('/:id', isLoggedIn, (req, res, next) => {
  if (req.requestedUser) {
    req.requestedUser.destroy()
      .then(() => res.sendStatus(204))
      .catch(next);
  } else next(makeError(403, 'Forbidden'));
});

router.put('/:id', (req, res, next) => {
  req.requestedUser.update(req.body)
    .then(user => res.json(user))
    .catch(next);
});
