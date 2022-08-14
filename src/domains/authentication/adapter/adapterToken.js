require('dotenv').config();
const jwt = require('jsonwebtoken');

class AdapterToken {
  /* eslint-disable class-methods-use-this */
  sign(id) {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_SIGN, {
      expiresIn: process.env.ONE_DAY_EXPIRATION,
    });
    return token;
  }
}

module.exports = AdapterToken;
