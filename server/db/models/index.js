const User = require('./user');
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');
const Cart = require('./cart');
const Order = require('./order');


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Product.belongsTo(Category) //CategoryId on product

Order.belongsTo(User) //UserId on order

Order.belongsToMany(Product, {through: 'ProductsInOrder'}) //ProductsInOrder join table
Product.belongsToMany(Order, {through: 'ProductsInOrder'})

Cart.belongsTo(User) //cart has UserId
Cart.hasMany(Product) //cartId on Product

Product.hasMany(Review) //ProductId on review
Review.belongsTo(User) //UserId on review

Product.hasMany(Category) //ProductId on Category
Category.hasMany(Product) //CategoryId on product




/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


module.exports = {
  User
}
