const userRouter = require('express').Router();
const User = require('../db/models/user');

// get all users //
userRouter.get('/', (req, res, next) => {
  User.findAll()
    .then(users =>
      res.status(200).json(users))
    .catch(next);
});

// get a single user //
userRouter.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    })
    .catch(next);
});

// create a user //
userRouter.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user =>
      res.status(201).json(user))
    .catch(next);
});

// update a user //
userRouter.put('/:userId', (req, res, next) => {
  User.update(req.body, {
      where: {id: req.params.userId},
      returning: true
    })
    .spread((usersUpdatedCount, userRows) => {
      if (!usersUpdatedCount) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(userRows[0]);
      }
    })
    .catch(next);
});

// delete a user //
userRouter.delete('/:userId', (req, res, next) => {
  User.destroy({ where: {id: req.params.userId} })
    .then(usersDestroyedCount => {
      if (!usersDestroyedCount) {
        res.status(404).send('User not found');
      } else {
        res.status(204).send('User deleted');
      }
    })
    .catch(next);
});

module.exports = userRouter;
