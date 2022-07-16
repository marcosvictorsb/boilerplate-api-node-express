const UserRepository = require('../repositories/users-repository')
const enumHelperUser = require('../../../helpers/enumHelperUser')
const { created, conflict } = require('../../../protocols/https')

class UserService {
  constructor(params = {}){
    this.repository = params.repository || new UserRepository();
    this.enumHelperUser = params.enumHelperUser || enumHelperUser;
  }

  create(user){

    const userAlreadyExists = this.repository.getByEmail(user.email);
    if(!userAlreadyExists) return conflict(this.enumHelperUser.user.alreadyExists);

    const result = this.repository.create(user);

    if(!result) return conflict(this.enumHelperUser.user.errorToCreateUser);
    return created(result)
  }
}


module.exports = UserService;