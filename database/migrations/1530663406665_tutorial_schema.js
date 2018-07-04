'use strict'

const Schema = use('Schema')

class TutorialSchema extends Schema {
  up () {
    this.create('tutorials', (table) => {
      table.string('title', 254).notNullable()
      table.string('slug', 254).notNullable().unique()
      table.string('url', 254).notNullable()
      table.string('kategori', 254).notNullable()
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('tutorials')
  }
}

module.exports = TutorialSchema
