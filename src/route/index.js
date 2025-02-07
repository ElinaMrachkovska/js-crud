// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(name, price, description) {
    this.id = Math.floor(Math.random() * 100000)
    // this.id = new Date().getTime()
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static getList = () => this.#list
  static add(product) {
    this.#list.push(product)
    return this.#list
  }

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, { name }) => {
    const product = this.getById(id)
    if (product) {
      if (name) {
        product.name = name
      }
      return true
    } else {
      return false
    }
  }
}
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    data: {
      products: {
        list,
        isEmpty: list === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

router.get('/product-create', function (req, res) {
  const { name, price, description } = req.body
  // console.log(req.body)
  const product = new Product(name, price, description)
  Product.add(product)

  console.log(Product.getList())

  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Продукт було успішно cтворено',
  })
})

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  // console.log(req.body)
  const product = new Product(name, price, description)
  Product.add(product)

  console.log(Product.getList())

  res.render('alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert',
    info: 'Продукт було успішно cтворено',
  })
})
router.get('/product-list', function (req, res) {
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    info: 'список товарів',
    data: {
      list: Product.getList(),
    },
  })
})
router.get('/product-delete', function (req, res) {
  const { id } = req.query
  Product.deleteById(Number(id))
  res.render('alert', {
    style: 'alert',
    info: 'Користувач видалений',
  })
})

router.get('/product-edit', function (req, res) {
  const { id } = req.query

  const result = Product.getById(Number(id), req.body)
  res.render('product-edit', {
    style: 'product-edit',
    info: result
      ? 'Товар оновлено'
      : 'Товар з таким ID не знайдено',
  })
})

router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body

  if (!id || !name || !price || !description) {
    return res.render('alert', {
      style: 'alert',
      info: 'Необхідно заповнити всі поля',
    })
  }

  try {
    const result = Product.updateById(Number(id), {
      name,
      price,
      description,
    })

    if (result) {
      res.render('alert', {
        style: 'alert',
        info: 'Товар оновлено',
      })
    } else {
      res.render('alert', {
        style: 'alert',
        info: 'Сталась помилка',
      })
    }
  } catch (error) {
    console.error(error)
    res.render('alert', {
      style: 'alert',
      info: 'Помилка оновлення даних товару',
    })
  }
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
