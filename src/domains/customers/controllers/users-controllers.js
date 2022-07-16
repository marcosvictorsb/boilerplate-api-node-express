const UserService = require('../services/users-service')

class UserController { 
  constructor(params = {}) {
    this.service = params.service || new UserService()

  }

  create(request, response) {
    try {
      const { name, email, password, repeatPassword } = request.body
      
      const newUser = {
        name,
        email,
        password,
        repeatPassword
      }
      const result = this.service.create(newUser)
      return response.status(result.status).json(result.body)
    } catch (error) {
      console.log('UserController')
    }
  }
}


module.exports = UserController;