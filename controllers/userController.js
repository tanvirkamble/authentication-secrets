const express = require('express');
const User = require('../models/userSchema');

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
  res.render('secrets');
};

const submitPage = async (req, res) => {
  res.render('submit');
};

const registerPost = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.username,
      password: req.body.password,
    });

    res.render('secrets');
  } catch (err) {
    console.log(err);
  }
};

const loginPost = async (req, res) => {
  try {
    const { username, password } = req.body;
    // const username = req.body.username;
    // const password = req.body.password;

    User.findOne({ email: username })
      .then((result) => {
        if (result.password === password) {
          res.render('secrets');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  homePage,
  loginPage,
  registerPage,
  secretsPage,
  submitPage,
  registerPost,
  loginPost,
};
