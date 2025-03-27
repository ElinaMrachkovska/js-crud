// const express = require('express')
// const router = express.Router()

// // ================================================================

// class Product {
//   static #list = []
//   constructor(name, price, description) {
//     this.id = Math.floor(Math.random() * 100000)

//     this.createDate = new Date().toISOString()
//     this.name = name
//     this.price = price
//     this.description = description
//   }

//   static getList = () => this.#list
//   static add(product) {
//     this.#list.push(product)
//     return this.#list
//   }

//   static getById = (id) =>
//     this.#list.find(
//       (product) => Number(product.id) === Number(id),
//     )

//   static deleteById = (id) => {
//     const index = this.#list.findIndex(
//       (product) => product.id === id,
//     )
//     if (index !== -1) {
//       this.#list.splice(index, 1)
//       return true
//     } else {
//       return false
//     }
//   }

//   static updateById = (
//     id,
//     { name, price, description },
//   ) => {
//     const product = this.getById(id)
//     if (product) {
//       if (name) {
//         product.name = name
//         product.price = price
//         product.description = description
//       }
//       return true
//     } else {
//       return false
//     }
//   }
// }

// router.get('/', function (req, res) {
//   const list = Product.getList()

//   res.render('index', {
//     style: 'index',
//     data: {
//       products: {
//         list,
//         isEmpty: list === 0,
//       },
//     },
//   })
// })

// router.get('/product-create', function (req, res) {
//   const { name, price, description } = req.body
//   // console.log(req.body)
//   const product = new Product(name, price, description)
//   Product.add(product)
//   console.log(Product.getList())
//   res.render('alert', {
//     style: 'alert',
//     info: 'Продукт було успішно cтворено',
//   })
// })

// router.post('/product-create', function (req, res) {
//   const { name, price, description } = req.body

//   const product = new Product(name, price, description)
//   Product.add(product)

//   console.log(Product.getList())

//   res.render('alert', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'alert',
//     info: 'Продукт було успішно cтворено',
//   })
// })
// router.get('/product-list', function (req, res) {
//   res.render('product-list', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'product-list',
//     info: 'список товарів',
//     data: {
//       list: Product.getList(),
//     },
//   })
// })
// router.get('/product-delete', function (req, res) {
//   const { id } = req.query
//   Product.deleteById(Number(id))
//   res.render('alert', {
//     style: 'alert',
//     info: 'Користувач видалений',
//   })
// })

// router.get('/product-edit', function (req, res) {
//   const { id } = req.query
//   // const result = Product.getById(Number(id), req.body)
//   res.render('product-edit', {
//     style: 'product-edit',
//     // info: result
//     //   ? 'Товар оновлено'
//     //   : 'Товар з таким ID не знайдено',
//     info: 'Редагування товару',
//     ...(Product.getById(id) ?? {}),
//   })
// })

// router.post('/product-edit', function (req, res) {
//   const { id } = req.query
//   const { name, price, description } = req.body

//   if (!id || !name || !price || !description) {
//     return res.render('alert', {
//       style: 'alert',
//       info: 'Необхідно заповнити всі поля',
//     })
//   }

//   try {
//     const result = Product.updateById(Number(id), {
//       name,
//       price,
//       description,
//     })

//     if (result) {
//       res.render('alert', {
//         style: 'alert',
//         info: 'Товар оновлено',
//       })
//     } else {
//       res.render('alert', {
//         style: 'alert',
//         info: 'Сталась помилка',
//       })
//     }
//   } catch (error) {
//     console.error(error)
//     res.render('alert', {
//       style: 'alert',
//       info: 'Помилка оновлення даних товару',
//     })
//   }
// })

// // ================================================================

// // Підключаємо роутер до бек-енду
// module.exports = router

// const express = require('express')
// const router = express.Router()

// // ================================================================

// class Purchase {}

// router.get('/', function (req, res) {
//   const list = Product.getList()

//   res.render('index', {
//     style: 'index',
//     data: {},
//   })
// })

// // Підключаємо роутер до бек-енду
// module.exports = router

// const express = require('express')
// const router = express.Router()

// ================================================================

const express = require('express')
const router = express.Router()

class Product {
  static #list = []

  static #count = 0

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    this.id = ++Product.#count
    this.img = img
    this.title = title
    this.description = description
    this.category = category
    this.price = price
    this.amount = amount
  }
  static add = (...data) => {
    const newProduct = new Product(...data)
    this.#list.push(newProduct)
  }
  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }
  //фільтруємо товари, щоб вилучити той, який обрали
  static getRandomList = (id) => {
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )
    // Відсортовуємо та перемішуємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )
    //Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.splice(0, 3)
  }
}
Product.add(
  './img/comp/616.png',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС`,
  [
    { id: 2, text: 'Готовий до відправки' },
    { id: 1, text: 'Топ продажів' },
  ],
  27000,
  10,
)
Product.add(
  './img/comp/617.png',
  "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
  'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
  [{ id: 1, text: 'Топ продажів' }],
  17000,
  10,
)

Product.add(
  './img/comp/618.png',
  "Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)",
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС',
  [{ id: 1, text: 'Топ продажів' }],
  113009,
  10,
)

Product.add(
  './img/comp/616.png',
  "Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600",
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [
    { id: 2, text: 'Готовий до відправки' },
    { id: 1, text: 'Топ продажів' },
  ],
  27000,
  10,
)
Product.add(
  './img/comp/617.png',
  "Комп'ютер COBRA Advanced (I11F.8.H1S2.15T.13356) Intel",
  'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
  [{ id: 1, text: 'Топ продажів' }],
  17000,
  10,
)

Product.add(
  './img/comp/618.png',
  "Комп'ютер ARTLINE Gaming by ASUS TUF v119 (TUFv119)",
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi / Bluetooth / без ОС',
  [{ id: 1, text: 'Топ продажів' }],
  113009,
  10,
)
class Purchase {
  static DLIVERY_PRICE = 150
}
// router.get('/', function (req, res) {
//   const list = Product.getList()

//   res.render('purchase-index', {
//     style: 'purchase-index',
//     data: {
//       img: 'https://picsum.photos/200/300.jpg',
//       title:
//         'Компютер Artline Gaming (X43v31) AMD Ryzen 5 3600',
//       description:
//         'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
//       category: [
//         { id: 1, text: 'Готовий до відправки' },
//         { id: 2, text: 'Топ продажів' },
//       ],
//       price: 27000,
//     },
//   })
// })

router.get('/', function (req, res) {
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
})

router.get('/purchase-product', function (req, res) {
  const id = Number(req.query.id)
  res.render('purchase-product', {
    style: 'purchase-product',
    data: {
      list: Product.getRandomList(id),
      product: Product.getById(id),
    },
  })
})

router.post('/purchase-create', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  console.log(id, amount)

  if (amount < 1) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${іd}`,
      },
    })
  }

  const product = Product.getById(id)

  if (product.amount < 1) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Такої кількості товару немає в наявності',
        link: `/purchase-product?id=${іd}`,
      },
    })
  }

  console.log(product, amount)

  // res.render('purchase-product', {
  //   style: 'purchase-product',
  //   data: {
  //     list: Product.getRandomList(id),
  //     product: Product.getById(id),
  //   },
  // })

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DLIVERY_PRICE

  res.render('purchase-create'),
    {
      style: 'purchase-create',
      data: {
        id: product.id,
        cart: [
          {
            text: `${product.title} (${amount} шт)`,
            price: productPrice,
          },
          {
            text: 'Доставка',
            price: Purchase.DLIVERY_PRICE,
          },
        ],
        totalPrice,
        productPrice,
        deliveryPrice: Purchase.DLIVERY_PRICE,
      },
    }
})

router.post('/purchase-submit', function (req, res) {
  console.log(req.query)
  console.log(req.body)

  res.render('alert', {
    style: 'alert',

    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link: `/purchase-list`,
    },
  })
})

// router.get('/product-create', function (req, res) {
//   const { name, price, description } = req.body
//   // console.log(req.body)
//   const product = new Product(name, price, description)
//   Product.add(product)
//   console.log(Product.getList())
//   res.render('alert', {
//     style: 'alert',
//     info: 'Продукт було успішно cтворено',
//   })
// })

// router.post('/product-create', function (req, res) {
//   const { name, price, description } = req.body

//   const product = new Product(name, price, description)
//   Product.add(product)

//   console.log(Product.getList())

//   res.render('alert', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'alert',
//     data: {
//       message: 'Операція успішна',
//       info: 'Товар cтворений',
//       link: '/test-path',
//     },
//   })
// })
// router.get('/product-list', function (req, res) {
//   res.render('product-list', {
//     // вказуємо назву папки контейнера, в якій знаходяться наші стилі
//     style: 'product-list',
//     info: 'список товарів',
//     data: {
//       list: Product.getList(),
//     },
//   })
// })
// router.get('/product-delete', function (req, res) {
//   const { id } = req.query
//   Product.deleteById(Number(id))
//   res.render('alert', {
//     style: 'alert',
//     info: 'Користувач видалений',
//   })
// })

// router.get('/product-edit', function (req, res) {
//   const { id } = req.query
//   // const result = Product.getById(Number(id), req.body)
//   res.render('product-edit', {
//     style: 'product-edit',
//     // info: result
//     //   ? 'Товар оновлено'
//     //   : 'Товар з таким ID не знайдено',
//     info: 'Редагування товару',
//     ...(Product.getById(id) ?? {}),
//   })
// })

// router.post('/product-edit', function (req, res) {
//   const { id } = req.query
//   const { name, price, description } = req.body

//   if (!id || !name || !price || !description) {
//     return res.render('alert', {
//       style: 'alert',
//       info: 'Необхідно заповнити всі поля',
//     })
//   }

//   try {
//     const result = Product.updateById(Number(id), {
//       name,
//       price,
//       description,
//     })

//     if (result) {
//       res.render('alert', {
//         style: 'alert',
//         info: 'Товар оновлено',
//       })
//     } else {
//       res.render('alert', {
//         style: 'alert',
//         info: 'Сталась помилка',
//       })
//     }
//   } catch (error) {
//     console.error(error)
//     res.render('alert', {
//       style: 'alert',
//       info: 'Помилка оновлення даних товару',
//     })
//   }
// })

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
