const express = require('express')
const router = express.Router()

class Track {
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.author = author
    this.image = image
  }
}

router.get('/', function (req, res) {
  res.render('spotify-choose', {
    style: 'spotify-choose',

    data: {},
  })
})

router.get('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix

  console.log(isMix)

  res.render('spotify-create', {
    style: 'spotify-create',

    data: {
      isMix,
    },
  })
})

router.post('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix

  const name = req.body.name

  if (!name) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Введіть назву плейлиста',
        link: isMix
          ? 'spotify-create?isMix=true'
          : 'spotify-create',
      },
    })
  }
  console.log(req.body, req.query)

  res.render('spotify-create', {
    style: 'spotify-create',

    data: {},
  })
})

// Підключаємо роутер до бек-енду
module.exports = router
