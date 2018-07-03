'use strict'

const Schema = use('Schema')

class KategoriSchema extends Schema {
  up () {
    this.create('kategoris', (table) => {
      table.string('title', 254).notNullable()
      table.string('slug', 254).notNullable().unique()
      table.string('image', 254).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('kategoris')
  }
}

module.exports = KategoriSchema
