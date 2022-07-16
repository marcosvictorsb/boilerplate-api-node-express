const UserRepository = require('../repositories/users-repository')
const enumHelperUser = require('../../../helpers/enumHelperUser')
const { created, conflict } = require('../../../protocols/https')

class UserService {
  constructor(params = {}){
    this.repository = params.repository || new UserRepository();
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
  }

  create(user){
    const { name, email, password, repeatPassword } = user;

    const userAlreadyExists = this.repository.getByEmail(email);
    if(!userAlreadyExists) return conflict(this.enumHelperUser.user.alreadyExists);    
      
    const newUser = {
      name,
      email,
      password,
      repeatPassword
    }
    const result = this.repository.create(newUser);

    if(!result) return conflict(this.enumHelperUser.user.errorToCreateUser);
    return created(result)
  }
}


module.exports = UserService;