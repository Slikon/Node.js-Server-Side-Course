const express = require('express');
const passport = require('passport');
const authenticate = require('../authenticate');

const bodyParser = require('body-parser');
var User = require('../models/user');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

/* GET users listing. */
usersRouter.get(
  '/',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find({})
      .then(
        (users) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(users);
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  }
);

usersRouter.post('/signup', (req, res, next) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        //assigning first & last name to user while registrating
        if (req.body.firstName) {
          user.firstName = req.body.firstName;
        }
        if (req.body.lastName) {
          user.lastName = req.body.lastName;
        }

        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    }
  );
});

usersRouter.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    success: true,
    token: token,
    status: 'You are succesfully logged in!',
  });
});

usersRouter.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = usersRouter;
