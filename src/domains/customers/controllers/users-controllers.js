class UserController { 
  constructor(params = {}) {

  }

  create(request, response) {
    try {
      response.status(200).json({message: 'OK'})
    } catch (error) {
      console.log('UserController')
    }
  }
}


module.exports = UserController;