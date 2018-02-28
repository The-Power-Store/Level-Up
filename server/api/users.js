const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => { // YEAHHHHHH! -- KHEA
  User.findById(id)
    .then(user => {
      if (!user) res.sendStatus(404); // wahhh -- use error handling middleware -- KHEA
      req.requestedUser = user;
      next();
    })
    .catch(next);
});

router.get('/', (req, res, next) => { // only admin probably -- KHEA
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
});

router.post('/', (req, res, next) => { // only be admin -- KHEA
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});

router.get('/:id', (req, res, next) => { // adminOrSelf -- KHEA
  User.findAll({ // findOne -- KHEA
    where: { id: req.params.userId } // just id -- KHEA
  })
    .then(user => res.json(user))
    .catch(next);
});

// spacing -- KHEA
router.delete('/:id', (req, res, next) => { // adminOrSelf -- KHEA
  req.requestedUser.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});

router.put('/:id', (req, res, next) => { // adminOrSelf -- KHEA
  req.requestedUser.update(req.body) // consider if they are sending something to update self to admin -- KHEA
    .then(user => res.json(user))
    .catch(next);
});






