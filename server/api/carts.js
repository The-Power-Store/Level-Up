const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

// find all items by specific cart
router.get('/:userId', (req, res, next) => {
    console.log("oh, I get a request from the store for the cart items",req.params.userId )
    const userID = +req.params.userId
    Cart.findAll({
        where: {
            userId: userID
        }
    })
        .then(cartItems=> {
            const arrOfItems=[]
            cartItems.map((item)=>{
                arrOfItems.push(item.dataValues)
            })
            return res.json(arrOfItems)})
        .catch(next)
})

// add new cart item, or if the item already is in the cart, update its quantity 
router.post('/', (req, res, next) => {
     console.log("FROM THE BACKEND, the request looks like ", req.body)
    Cart.findOne({where:{userId:req.body.userId, productId: req.body.productId}})
    .then(foundArr=>{
        //console.log("Tne around array of objects is", foundArr)
        // console.log("Tne around array of objects is", foundArr)

        if(foundArr!=null){
             console.log("The item is already in the caret, so increase it quantity")
            const newquant = +req.body.quantity + foundArr.dataValues.quantity
            foundArr.update({quantity:newquant})
            .then((createdItem => {
                return res.status(201).json(createdItem)}))
            .catch(next)
        }else{
             console.log("The item does not exist in the cart yet")
            Cart.create(req.body) //this should be a product and it's information
                .then(createdItem => res.status(201).json(createdItem))
                .catch(next);
        }
    })

})

//update cart item, might not need this 
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
            res.sendStatus(202)
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
