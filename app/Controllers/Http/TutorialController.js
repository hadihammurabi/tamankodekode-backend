'use strict'

const Tutorial = use('App/Models/Tutorial')

class TutorialController {
  async index ({ request }) {
    const { kategori } = request.all()
    return await Tutorial.query().where('kategori', kategori).fetch()
  }

  async show ({ request }) {
    return 'show'
  }

  async store ({ request }) {
    const { title, slug, url, kategori } = request.all()

    const tutorial    = new Tutorial()
    tutorial.title    = title
    tutorial.slug     = slug
    tutorial.url      = url
    tutorial.kategori = kategori
    await tutorial.save()

    return tutorial
  }
}

module.exports = TutorialController
