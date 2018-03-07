const { expect } = require('chai')
const db = require('../index')
const Cart = db.model('cart')
const User = db.model('user')

describe('Cart model', () => {
    beforeEach(() => {
        return db.sync({ force: true })
    })

    describe('destroy hook', () => {
        beforeEach(() => {
            // return Cart.create({
            //     quantity: 5,
            //     productId: 2,
            //     userId: 
            // })
        })
    })
})
