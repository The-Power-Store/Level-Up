const router = require("express").Router();
const { Order, Cart, Product, ProductsInOrder } = require("../db/models");
const { isLoggedIn, makeError, isAdmin } = require('./utils')
module.exports = router;

// function createError(status, message) {
//   const error = new Error(message)
//   error.status = status
//   return error
// }
// all orders for admin to access and look at
router.get('/', isLoggedIn, (req, res, next) => {
  const query = req.user.isAdmin ? {} : { where: { userId: req.user.userId } }
  return Order.findAll(query)
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  //add a logged in 
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next)
})

//create order
//create products in order
// move join table to cart and product 
// order has cart id 

//needs to pull in cart info from database or session and make that req.body
// Order.create()
// .then(createdOrder => Promise.all(cartArr.map(item => productsInOrder.create(Object.assign(item, {orderId: createdOrder.id}))))
// .then(allGood)
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      const currentOrder = order
      return currentOrder
    })
    .then(currentOrder => {
      console.log('new current order is ' + currentOrder)
      Cart.findAll({
        where: {
          userId: req.body.userId
        }
      })
        .then(cartItems => {
          console.log('dis is the cart items ' + cartItems)
          Promise.all(cartItems.map(item => {
            return Product.findById(item.dataValues.productId)
              .then(product => {
                return ProductsInOrder.create({ quantity: item.dataValues.quantity, price: product.price, orderId: currentOrder.id, productId: product.id })
              })
          })
          )
            .then((data) => {
              console.log('we did a thing! ', data)
              res.sendStatus(201)
            })

        })

    }
    )

    // console.log(req.body)
    // Order.create(req.body)
    //   .then(order => res.status(201).send(order))

    //ProductInOrder.create
    // req.user.cart
    //loop through each item in users cart to add it to productinorder with correct
    // products and persist the quantity and price at the time order was created
    .catch(next)
})

//can update order status if they are an admin user(using isAdmin util function here)
router.put('/:orderId', isAdmin, (req, res, next) => {
  Order.update(req.body, {
    where: {
      id: req.params.orderId
    },
    returning: true
  })
    //need to make more readable/meaningful 
    .then(updates => {
      const updatedStatus = updates[1][0];
      res.json(updatedStatus);
    })
    .catch(next);
})


