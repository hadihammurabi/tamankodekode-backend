'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    const {email, password} = request.all()

    const user = new User()
    user.email = email
    user.password = password
    try
    {
      await user.save()
    } catch(e) {
      return response.status(400).json({ code: e.code, message: e.message })
    }
    return {
      data: user
    }
  }

  async auth({ request, response, auth }) {
    const { email, password } = request.all()
    let token = undefined
    try{
      token = await auth.withRefreshToken().attempt(email, password)
    } catch(e) {
      console.log(e)
      return response.status(400).json({
        code: 'FAIL_LOGIN',
        message: 'Login gagal, periksa kembali email dan password Anda!'
      })
    }
    return response.status(200).json({
      token
    })
  }
}

module.exports = UserController
