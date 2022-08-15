class AdapterEncryption {
  constructor(params = {}) {
    this.bcrypt = params.bcrypt;
  }

  generateHashPassword(password) {
    const SALT_ROUNDS = 10;
    const salt = this.bcrypt.genSaltSync(SALT_ROUNDS);
    const hash = this.bcrypt.hashSync(password, salt);

    return hash;
  }

  comparePasswords(password1, password2) {
    return this.bcrypt.compareSync(password1, password2);
  }
}

module.exports = AdapterEncryption;
