'use strict'

const Kategori = use('App/Models/Kategori')

class KategoriController {
  async index () {
    return await Kategori.all()
  }

  async show ({ request }) {
    const id = request.params.id
    return await Kategori.find(id)
  }

  async store ({ request }) {
    const { title, slug, image } = request.all()
    const kategori = new Kategori()
    kategori.title = title
    kategori.slug  = slug
    kategori.image = image
    await kategori.save()
    return kategori
  }

  async destroy ({ request }) {
    const id = request.params.id
    const kategori = await Kategori.find(id)
    await kategori.delete()
    return {
      message: 'Berhasil dihapus.',
      kategori
    }
  }
}

module.exports = KategoriController
