const router = require('express').Router();
const { Order, Cart, Product, ProductsInOrder } = require('../db/models');
const { isLoggedIn, makeError, isAdmin } = require('./utils');
module.exports = router;

// all orders for admin to access and look at
router.get('/', isLoggedIn, (req, res, next) => {
  const query = req.user.isAdmin ? {} : { where: { userId: req.user.id } };
  return Order.findAll(query)
    .then(orders => res.json(orders))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  //add a logged in
  Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next);
});

//create order
//add a user variable that is a ternary checking if they are admin. if so use req.body.userId
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      const currentOrder = order;
      return currentOrder;
    })
    .then(currentOrder => {
      if (req.user == null) {
        //make the order, like normal
        Promise.all(
          Object.keys(req.session.cart).map(key => {
            return Product.findById(+key).then(product => {
              return ProductsInOrder.create({
                quantity: req.session.cart[key],
                price: product.price,
                orderId: currentOrder.id,
                productId: product.id
              });
            });
          })
        )
          .then(data => {
            req.session.destroy(function(err) {});
          })
          .catch(next);
      } else {
        Cart.findAll({
          where: {
            userId: req.user.id
          }
        }).then(cartItems => {
          return Promise.all(
            cartItems.map(item => {
              return Product.findById(item.productId).then(product => {
                return ProductsInOrder.create({
                  quantity: item.quantity,
                  price: product.price,
                  orderId: currentOrder.id,
                  productId: product.id
                });
              });
            })
          )
            .then(data => {
              return Cart.destroyCart(req.user.id);
            })
            .then(data => {
              res.sendStatus(201);
            });
        });
      }
    })
    .catch(next);
});

//can update order status if they are an admin user(using isAdmin util function here)
router.put('/:orderId', isAdmin, (req, res, next) => {
  Order.update(req.body, {
    where: { id: req.params.orderId },
    returning: true
  })
    //need to make more readable/meaningful
    .then(updates => {
      const updatedStatus = updates[1][0];
      res.json(updatedStatus);
    })
    .catch(next);
});
