const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

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

const secret = 'ThisIsOurLittleSecret';
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

const User = mongoose.model('user', userSchema);

module.exports = User;
