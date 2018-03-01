const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

// find all items by specific cart
router.get('/:cartId', (req, res, next) => {
    Cart.findAll({
        where: {
            id: req.params.cartId
        }
    })
        .then(cartItems => res.json(cartItems))
        .catch(next)
})

// add new cart item
router.post('/', (req, res, next) => {
    Cart.create(req.body) //this should be a product and it's information
        .then(createdItem => res.status(201).json(createdItem))
        .catch(next);
})

//update cart item
router.put('/:cartItemId', (req, res, next) => {
    Cart.update(req.body, {
        where: {
            id: req.params.cartItemId
        },
        returning: true
    })
        .then(updates => { //make more meaningful and check if this actually makes sense
            const updated = updates[1][0];
            res.json(updated);
        })
        .catch(next);
})

// delete all items from cart aka delete cart
router.delete('/', (req, res, next) => {
    const userId = req.user.id
    Cart.destroy({
        where: {
            userId: userId
        }
    })
        .then((rowsDeleted) => {
            console.log('Yer cart has been deleted, yo' + rowsDeleted)
        })
        .catch(next)
})

// delete item from cart
router.delete('/:cartItemId', (req, res, next) => {
    Cart.destroy({
        where: {
            id: req.params.cartItemId
        }
    })
        .then((rowsDeleted) => {
            console.log('These cart items have been deleted, yo ' + rowsDeleted)
            res.sendStatus(202)
        })
        .catch(next)
})