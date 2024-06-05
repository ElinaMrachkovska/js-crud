// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []
  constructor(id, createDate, name, price, description) {
    id = Math.floor(Math.random() * 100000)
    createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }
  static getList = () => this.#list
  static add(product) {
    this.#list.push(product)
  }
  static getById = (id) =>
    this.#list.find((product) => user.id === id)

  static updateById(id, data) {
    const product = this.getById(id)
    if (product) {
      this.update(price, name, description)
      return true
    } else {
      return false
    }
  }
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
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body
  const product = new Product(name, price, description)
  Product.add(product)

  console.log(Product.getList())
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('/alert', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: '/alert',
    info: 'Продукт створено',
  })
  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
