const models = require('../models');
const { jwt } = require('../utils');
const config = require('../config/config');

module.exports = {

  get: {
    login: function (req, res, next) {
      res.render('loginPage.hbs', { pageTitle: 'Login Page' });
    },

    register: function (req, res, next) {
      res.render('registerPage.hbs', { pageTitle: 'Register Page' });
    },

    logout: function (req, res) {
      const token = req.cookies[config.cookie];

      models.TokenBlackList.create({ token }).then(() => {
        res.clearCookie(config.cookie).redirect('/home/');
      });
    }
  },

  post: {
    login: function (req, res, next) {
      const { username, password } = req.body;

      models.User.findOne({ username })
        .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
        .then(([user, match]) => {
          if (!match) {
            const errors = {
              message: 'Wrong password or username!'
            };

            res.render('loginPage.hbs', { username, password, errors, pageTitle: 'Login Page' });
            return;
          };
          const token = jwt.createToken({ id: user._id });

          res.cookie(config.cookie, token).redirect('/home/');
        })
        .catch(err => next(err));
    },

    register: function (req, res, next) {
      const { username, password, repeatPassword } = req.body;

      if (password !== repeatPassword) {
        const errors = {
          message: "Repeat password have to be the same like password."
        };

        res.render('registerPage.hbs', { username, password, repeatPassword, errors, pageTitle: 'Register Page' });
        return;
      }
      models.User.create({ username, password })
        .then(registeredUser => {
          res.redirect('/user/login');
        })
        .catch(err => {

          if (err.name === 'ValidationError') {
            const hbsObject = {
              pageTitle: 'Register Page',
              username,
              password,
              repeatPassword,
              errors: err.errors
            };

            res.render('registerPage.hbs', hbsObject);
            return;
          };
          next(err);
        });
    }
  },
}