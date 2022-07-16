const UserService = require('../services/users-service')

class UserController { 
  constructor(params = {}) {
    this.service = params.service || new UserService()

  }

  create(request, response) {
    try {     
      const result = this.service.create(request.body)
      return response.status(result.status).json(result.body)
    } catch (error) {
      console.log('UserController')
    }
  }
}


module.exports = UserController;