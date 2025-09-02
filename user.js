// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.model('User', {
  username: String,
  password: String,
  // Add more fields as needed
});

// Password Hashing (Do not expose passwords in plain text)
User.prototype.savePassword = function(password) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    this.password = hash;
    this.save();
  });
};

User.statics.verifyPassword = function(plain, hash) {
  return bcrypt.compare(plain, hash);
};

module.exports = User;