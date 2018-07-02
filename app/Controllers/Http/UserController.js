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
              .from('no-reply@tamankodekode.org')
              .subject('Verifikasi akun Taman Kode-Kode')
        })
        return {
          message: 'Email verifikasi telah dikirim.'
        }
      } catch (e) {
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

  async verifyCallback ({ request, response, auth }) {
    const { token } = request.params
    try {
      const data = await got('http://localhost:3000/user/verified', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if(data.body.verified) {
        response.redirect('https://35.231.229.161/')
      }
    } catch (e) {}
  }

  async verify ({ request, response, auth }) {
    const user = await auth.getUser()
    user.verified = true
    //await user.save()
    return user
  }

}

module.exports = UserController
