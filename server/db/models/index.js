const Sequelize = require ('sequelize');
const {User} = require('./user'); // just have user in there -- KHEA
const Product = require('./product');
const Category = require('./category');
const Review = require('./review');
const Order = require('./order');

// MAKE ME -- KHEA
const ProductsInOrder = require('./productsInOrder') // make sure i have quantity and price -- KHEA

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

// Product.belongsTo(Category) //CategoryId on product

Order.belongsTo(User) //UserId on order

Order.belongsToMany(Product, {through: ProductsInOrder}) //ProductsInOrder join table
// might be beneficial to have productsInOrder belongs to order and product -- KHEA

// Product.belongsToMany(Order, {through: 'ProductsInOrder'})

// Cart.belongsTo(User) //cart has UserId
// Cart.hasMany(Product) //cartId on Product

Product.hasMany(Review) //ProductId on review
Review.belongsTo(User) //UserId on review
// not necessary, but helpful for different eager loadings -- KHEA
// I'd like to see review -> product
// I'd like to see user -> review

// Product.hasMany(Category) //ProductId on Category
Category.hasMany(Product) //CategoryId on product





/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */


module.exports = {
  User,
  Product,
  Category,
  Review,
  Order
}
