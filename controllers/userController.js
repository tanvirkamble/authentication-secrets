const express = require('express');
const User = require('../models/userSchema');
//const md5 = require('md5'); // without salting hash fuctn
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const { functions } = require('lodash');

const homePage = async (req, res) => {
  res.render('home');
};

const loginPage = async (req, res) => {
  res.render('login');
};

const registerPage = async (req, res) => {
  res.render('register');
};

const secretsPage = async (req, res) => {
  if (req.isAuthenticated()) {
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
};

const submitPage = async (req, res) => {
  res.render('submit');
};

// const hashPassword = async (password, saltRounds) => {
//   try {
//     const hash = await bcrypt.hash(password, saltRounds);
//     return hash;
//   } catch (err) {
//     throw err;
//   }
// };

const registerPost = async (req, res) => {
  // const { email, password } = req.body;
  console.log(req.body);

  User.register(
    { username: req.body.email },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('/register');
      } else {
        passport.authenticate('local')(req, res, () => {
          res.redirect('/secrets');
        });
      }
    }
  );
};

const loginPost = async (req, res) => {};

module.exports = {
  homePage,
  loginPage,
  registerPage,
  secretsPage,
  submitPage,
  registerPost,
  loginPost,
};
