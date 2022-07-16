const UserRepository = require('../repositories/users-repository')
const AdpaterEncryption = require('../adapters/adpterEncryption');
const enumHelperUser = require('../../../helpers/enumHelperUser')
const logger = require('../../../config/logger');
const { created, conflict, serverError } = require('../../../protocols/https')

class UserService {
  constructor(params = {}){
    this.repository = params.repository || new UserRepository();
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
    this.logger = params.logger || logger;
  }

  create(user){
    try {
      const { name, email, password } = user;

      const userAlreadyExists = this.repository.getByEmail(email);
      if(!!userAlreadyExists) {
        this.logger.info(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.alreadyExists} : ${email}`)
        return conflict(this.enumHelperUser.user.alreadyExists);    
      }      
      
      
      const newUser = { name, email, passwordEncryption: AdpaterEncryption.generateHashPassword(password) }
      const result = this.repository.create(newUser);    
      if(!result) {
        this.logger.info(`[CREATE USER SERVICE] - ${this.enumHelperUser.user.errorToCreateUser}`)
        return conflict(this.enumHelperUser.user.errorToCreateUser);
      }

      return created(result)
    } catch (error) {
      this.logger.info(`[CREATE USER SERVICE] - error to create user`);
      return serverError(error.message)
    }
  }
}


module.exports = UserService;