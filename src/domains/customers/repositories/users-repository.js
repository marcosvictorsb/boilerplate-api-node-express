const users = []

class UserRepository {
  constructor(params = {}) {
    this.tableName = params.tableName || 'users';
  }

  create(user){
    users.push(user);
    return users;
  }

  getByEmail(email){
    try {
      const user = users.find(user => user.email === email);
      return user;  
    } catch (error) {
      console.log(error) 
    }
  }
}

module.exports = UserRepository;