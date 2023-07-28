const mongoose = require('mongoose');
//var encrypt = require('mongoose-encryption');//this was for to encrypt password but this is commneted out because we are shifting to hash functn as it is more secure way

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

const User = mongoose.model('user', userSchema);

module.exports = User;
