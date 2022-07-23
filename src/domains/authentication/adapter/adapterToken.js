require('dotenv').config();
const jwt = require('jsonwebtoken');

class AdapterToken {
  static sign(id) {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: process.env.ONE_DAY_EXPIRATION,
    });
  }
}

module.exports = AdapterToken;
