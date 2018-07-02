'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'API Taman Kode-Kode' }
})

Route.post('/auth', 'UserController.auth') 

Route.resource('user', 'UserController')

Route.post('/user/verify', 'UserController.sendVerify')
Route.get('/user/verify/:token', 'UserController.verifyCallback')
