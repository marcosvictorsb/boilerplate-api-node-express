const bcrypt = require('bcryptjs');

class AdpaterEncryption {
  static generateHashPassword(password) {
    const SALT_ROUNDS = 10;
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static comparePasswords(password1, password2) {
    return bcrypt.compareSync(password1, password2);
  }
}

module.exports = AdpaterEncryption;
