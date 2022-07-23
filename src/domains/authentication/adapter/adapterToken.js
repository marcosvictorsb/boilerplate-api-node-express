require('dotenv').config();
const jwt = require('jsonwebtoken');

class AdapterToken {
  static sign(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET_SIGN, {
      expiresIn: process.env.ONE_DAY_EXPIRATION,
    });
  }
}

module.exports = AdapterToken;
