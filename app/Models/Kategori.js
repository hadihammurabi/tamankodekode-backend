'use strict'

const Model = use('Model')

class Kategori extends Model {
  tutorials () {
    return this.hasMany('App/Models/Tutorial')
  }
}

module.exports = Kategori
