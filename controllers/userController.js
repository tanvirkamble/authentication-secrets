const express = require('express');
const User = require('../models/userSchema');
//const md5 = require('md5'); // without salting hash fuctn
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

const hashPassword = async (password, saltRounds) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    throw err;
  }
};

const registerPost = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password, saltRounds);
    const newUser = await User.create({
      email: req.body.username,
      password: hashedPassword,
    });

    res.render('secrets');
  } catch (err) {
    console.log(err);
  }
};

const loginPost = async (req, res) => {
  try {
    const username = req.body.username;
    const providedPassword = req.body.password;

    const user = await User.findOne({ email: username });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(
        providedPassword,
        user.password
      );
      if (isPasswordMatch) {
        res.render('secrets');
      } else {
        // Password doesn't match
        console.log('err: password doesnt match');
      }
    } else {
      console.log('err: user not found');
    }
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
