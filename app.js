require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'our secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//import routes
const routes = require('./routes/routes');
const User = require('./models/userSchema');
const connectDB = require('./db/connectdb');
// Use the articlesRoutes middleware
app.use('/', routes);

//mongoose.connect('mongodb://127.0.0.1:27017/userDB');
const start = async () => {
  await connectDB(process.env.MONGODB_URL);
  app.listen('3000', () => {
    console.log('server is connected to 3000 port');
  });
};

start();
