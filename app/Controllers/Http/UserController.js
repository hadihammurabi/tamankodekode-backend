'use strict'

const got = require('got')

const Mail = use('Mail')
const Encryption = use('Encryption')

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

  async index({ request, auth }) {
    try {
      const data = await auth.getUser()
      return data
    } catch (e) {
      return 'belum login'
    }
  }

  async auth({ request, response, auth }) {
    const { email, password } = request.all()
    let token = undefined
    try{
      token = await auth.withRefreshToken().attempt(email, password)
    } catch(e) {
      return response.status(400).json({
        code: 'FAIL_LOGIN',
        message: 'Login gagal, periksa kembali email dan password Anda!'
      })
    }
    return response.status(200).json({
      token
    })
  }

  async sendVerify ({ request, response, auth }) {
    const { authorization } = request.headers()
    let user = ''
    try {
      user = await auth.getUser()
      const data = {
        user: user['$attributes'],
        token: authorization.split(' ')[1]
      }
      try {
        await Mail.send('email.verify', data, message => {
          message
              .to(user.email)
              .from('tamankodekode@gmail.com')
              .subject('Verifikasi akun Taman Kode-Kode')
        })
        return {
          message: 'Email verifikasi telah dikirim.'
        }
      } catch (e) {
        console.log(e)
        return e
        return response.status(400).json({
          code: 'FAIL_MAIL',
          message: 'Gagal mengirim email. Periksa kembali email Anda!'
        })
      }
    } catch (e) {
      return response.status(400).json({
        code: 'UNAUTH',
        message: 'Anda tidak diizinkan.'
      })
    }
  }

  async verifyCallback ({ request, response, view, auth }) {
    const { token } = request.params
    return response.send(view.render('verify', {token}))
  }

  async verify ({ request, response, auth }) {
    let user = await auth.getUser()
    const update = await User.query().where('email', user.email).update({verified: 'TRUE'})
    return {
      message: 'success'
    }
  }

}

module.exports = UserController
