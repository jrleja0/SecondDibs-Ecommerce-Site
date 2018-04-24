const authRouter = require('express').Router();
const User = require('../db/models/user');
module.exports = authRouter;

authRouter.post('/login', (req, res, next) => {
  User.scope('unsanitized').findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('We don\'t have an account under that email address');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('That password does not match our records');
      } else {
        req.login(user, err => {
          if (err) next(err);
          else res.status(200).json(user.sanitize());
        });
      }
      return null;
    })
    .catch(next);
});

authRouter.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.status(200).json(user.sanitize());
      });
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('We already have an account under that email address');
      } else {
        next(err);
      }
    });
});

authRouter.post('/logout', (req, res) => {
  req.logout();
  req.session.orderId = undefined;
  res.redirect('/');
});

authRouter.get('/me', (req, res) => {
  res.status(200).json(req.user);
});
