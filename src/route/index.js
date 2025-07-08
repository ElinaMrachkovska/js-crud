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
  static DELIVERY_PRICE = 150
  static #BONUS_FACTOR = 0.1 // 5%

  static #count = 0
  static #list = []

  static #bonusAccount = new Map()

  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }
  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    const amount = price * Purchase.#BONUS_FACTOR
    const currentBalance = Purchase.getBonusBalance(email)

    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)
    console.log(email, updatedBalance)
    return amount
  }

  constructor(data, product) {
    this.id = ++Purchase.#count
    this.title = data.title || product.title

    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phone = data.phone

    this.email = data.email
    this.comment = data.comment || null

    this.bonus = data.bonus || 0
    this.promocode = data.promocode || null

    this.totalPrice = data.totalPrice
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)
    this.#list.push(newPurchase)
    return newPurchase
  }

  static getList = () => {
    return Purchase.#list.reverse()
  }
  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstname) {
        purchase.firstname = data.firstname
        if (data.lastname) purchase.lastname = data.lastname
        if (data.phone) purchase.phone = data.phone
        if (data.email) purchase.email = data.email
      }
      return true
    } else {
      return false
    }
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromoCode = new Promocode(name, factor)
    Promocode.#list.push(newPromoCode)
    return newPromoCode
  }

  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('SUMMER2025', 0.9)
Promocode.add('WINTER2025', 0.5)
Promocode.add('SPRING2025', 0.75)

router.get('/', function (req, res) {
  res.render('purchase-index', {
    style: 'purchase-index',
    data: {
      list: Product.getList(),
    },
  })
})

// router.post('/purchase-create', function (req, res) {
//   const id = Number(req.query.id)
//   const amount = Number(req.body.amount)

//   console.log(id, amount)
//   res.render('purchase-product', {
//     style: 'purchase-product',
//     data: {
//       list: Product.getRandomList(id),
//       product: Product.getById(id),
//     },
//   })
// })
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

  if (amount < 1) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Некоректна кількість товару',
        link: `/purchase-product?id=${id}`,
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
        link: `/purchase-product?id=${id}`,
      },
    })
  }

  console.log(product, amount)

  const productPrice = product.price * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Purchase.calcBonusAmount(totalPrice)

  res.render('purchase-create', {
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
          price: Purchase.DELIVERY_PRICE,
        },
      ],
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
})
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    title,
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,
    comment,

    promocode,
    bonus,
  } = req.body

  const product = Product.getById(id)

  if (!product) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Товар не знайдено',
        link: `/purchase-list`,
      },
    })
  }

  if (product.amount < amount) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Товару в такій кількості немає',
        link: `/purchase-list`,
      },
    })
  }
  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount) ||
    isNaN(bonus) // Додано кому
  ) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка',
        info: 'Некоректні дані',
        link: `/purchase-list`,
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert', {
      style: 'alert',
      data: {
        message: 'Помилка, відсутні дані',
        info: 'Заповніть всі поля',
        link: `/purchase-list`,
      },
    })
  }

  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  const purchase = Purchase.add(
    {
      firstname,
      lastname,
      email,
      phone,
      comment,
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,
      bonus,
      promocode,
      title: product.title,
    },
    product,
  )

  console.log(purchase)

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

router.get('/purchase-list', function (req, res) {
  const purchaseList = Purchase.getList() // Отримуємо список замовлень

  // Перетворюємо дані для відображення
  const formattedList = purchaseList.map((purchase) => {
    return {
      id: purchase.id,
      title: purchase.product.title,
      totalPrice: purchase.totalPrice,
      bonus: purchase.bonus,
    }
  })

  res.render('purchase-list', {
    style: 'purchase-list',
    data: {
      list: formattedList,
      isEmpty: formattedList.length === 0,
    },
  })
})

router.get('/purchase-info', function (req, res) {
  const id = Number(req.query.id)
  const purchase = Purchase.getById(id)

  console.log('purchase data:', purchase)

  return res.render('purchase-info', {
    style: 'purchase-info',
    data: purchase,
    link: `/purchase-change?id=${id}`,
  })
})

router.get('/purchase-info', (req, res) => {
  // ...тут отримання purchaseInfo...
  res.render('purchase-info', {
    /* ... */
  })
})

router.get('/purchase-change', (req, res) => {
  const id = req.query.id
  // Тут отримай purchase по id (наприклад з БД або масиву)
  // Для прикладу:
  const purchase = {
    id: id,
    lastName: purchase.lastname,
    firstName: purchase.firstname,
    email: purchase.email,
    phone: purchase.phone,
  }
  res.render('purchase-change', { purchase })
})

router.post('/purchase-change', (req, res) => {
  // Тут збережи змінені дані з req.body
  // ...
  console.log(purchase)

  console.log(req.query)
  console.log(req.body)

  res.render('alert', {
    style: 'alert',

    data: {
      message: 'Успішно',
      info: 'Замовлення створено',
      link: `/purchase-info`,
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
