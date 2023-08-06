const mongoose = require('mongoose');
//var encrypt = require('mongoose-encryption');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const secret = process.env.MY_SECRET;
//userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

// userSchema.plugin(passportLocalMongoose);
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

const User = mongoose.model('user', userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;
